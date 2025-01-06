const {
  collection,
  addDoc,
  updateDoc,
  doc,
  arrayUnion,
  getDoc,
} = require("firebase/firestore");
const { db } = require("../firebase");

const createGoal = async ({ name, totalBooks, startDate, userId }) => {
  try {
    const goalData = {
      name,
      totalBooks,
      startDate,
      endDate: null,
      status: "Not Started",
      userId,
      books: [],
    };

    const docRef = await addDoc(collection(db, "goals"), goalData);
    return { id: docRef.id, ...goalData };
  } catch (error) {
    throw new Error("Erro ao salvar a meta no banco de dados: " + error.message);
  }
};

const addBookToGoal = async (goalId, bookId) => {
  try {
    const goalRef = doc(db, "goals", goalId);
    const goalSnap = await getDoc(goalRef);

    if (!goalSnap.exists()) {
      throw new Error("Meta não encontrada");
    }
    const goalData = goalSnap.data();

    const isBookAlreadyInGoal = goalData.books.some(
      (b) => b.bookId === bookId
    );

    if (isBookAlreadyInGoal) {
      throw new Error("O livro já está associado a esta meta.");
    }

    const updateBooks = [
      ...goalData.books,
      { bookId: bookId, status: "Not Started" },
    ];
    await updateDoc(goalRef, { books: updateBooks });

    await updateGoalProgress(goalId);
  } catch (error) {
    console.error("Erro ao adicionar livro à meta: ", error.message);
    throw new Error("Erro ao adicionar livro à meta: " + error.message);
  }
};


const updateGoalProgress = async (goalId) => {
  try {
    const goalRef = doc(db, "goals", goalId);
    const goalSnap = await getDoc(goalRef);

    if (!goalSnap.exists) {
      throw new Error("Meta não encontrada!");
    }

    const goalData = goalSnap.data();
    const readbooks = goalData.books.filter(
      (book) => book.status === "read"
    ).length;
    const progress = (readbooks / goalData.totalBooks) * 100;

    let updates = { progress };

    if (goalData.status === "Not Started" && readbooks > 0) {
      updates.status = "In Progress";
    }

    if (readbooks === goalData.totalBooks) {
      updates.endDate = new Date();
      updates.status = "Completed";
    }
    await updateDoc(goalRef, updates);
  } catch (error) {
    console.error("Erro ao atualizar progresso da meta: ", error.message);
    throw new Error("Erro ao atualizar progresso da meta: " + error.message);
  }
};
module.exports = { createGoal, addBookToGoal, updateGoalProgress};
