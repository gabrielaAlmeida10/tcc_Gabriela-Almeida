const {
  createGoal,
  addBookToGoal,
  updateGoalProgress,
} = require("../models/goalModel");

const createGoalController = async (req, res) => {
  try {
    const { name, totalBooks, startDate } = req.body;
    const userId = req.userId; 

    if (!name || !totalBooks || !startDate) {
      return res.status(400).json({ message: "Todos os campos obrigatórios devem ser preenchidos." });
    }

    const newGoal = await createGoal({ name, totalBooks, startDate, userId });
    res.status(201).json({message: "Meta criada com sucesso!", newGoal});
  } catch (error) {
    console.error("Erro ao criar a meta:", error.message);
    res.status(500).json({ message: "Erro ao criar a meta: " + error.message });
  }
}

const addBookToGoalController = async (req, res) => {
  try {
    const { goalId } = req.params;
    const { book } = req.body;

    if (!goalId || !book || !book.id) {
      return res
        .status(400)
        .json({ message: "ID da meta e dados do livro são obrigatórios" });
    }

    await addBookToGoal(goalId, book.id);
    res.status(200).json({ message: "Livro adicionado à meta com sucesso!" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Erro ao adicionar livro à meta: " + error.message });
  }
};


const updateGoalProgressController = async (req, res) => {
  try {
    const { goalId } = req.params;

    if (!goalId) {
      return res.status(400).json({ message: "ID da meta é obrigatório!" });
    }

    await updateGoalProgress(goalId);
    res
      .status(200)
      .json({ message: "Progresso da meta atualizado com sucesso!" });
  } catch (error) {
    res.status(500).json({
      message: "Erro ao atualizar o progresso da meta: " + error.message,
    });
  }
};

module.exports = {
  createGoalController,
  addBookToGoalController,
  updateGoalProgressController,
};
