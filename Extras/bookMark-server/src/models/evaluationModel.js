const {
  getFirestore,
  collection,
  addDoc,
  doc,
  updateDoc,
  getDoc,
} = require("firebase/firestore");
const { db } = require("../firebase");

const createEvaluation = async ({ userId, bookId, rating, comments = "" }) => {
  try {
    const evaluationData = {
      userId,
      bookId,
      rating,
      comments,
      createdAt: new Date(),
    };
    const evaluationRef = await addDoc(collection(db, "evaluations"), evaluationData);
    return { message: "Avaliação criada com sucesso!", evaluation: { id: evaluationRef.id, ...evaluationData } };
  } catch (error) {
    throw new Error("Erro ao criar avaliação: " + error.message);
  }
};



const updateEvaluation = async (evaluationId, userId, updates) => {
  const evaluationRef = doc(db, "evaluations", evaluationId);
  const evaluationSnap = await getDoc(evaluationRef);

  if (!evaluationSnap.exists() || evaluationSnap.data().userId !== userId) {
    throw new Error("Permissão negada ou avaliação não encontrada.");
  }

  await updateDoc(evaluationRef, updates);
};

module.exports = { createEvaluation, updateEvaluation };
