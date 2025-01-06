const { createEvaluation,updateEvaluation } = require("../models/evaluationModel");

const addEvalutationController = async (req, res) => {
  const { bookId, rating, comments = "" } = req.body;
  const userId = req.userId;

  if (!bookId || !rating) {
    return res.status(400).json({
      message: "Todos os campos obrigatórios devem ser preenchidos.",
    });
  }

  try {
    const result = await createEvaluation({ userId, bookId, rating, comments });
    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateEvaluationController = async (req, res) => {
  const { evaluationId } = req.params;
  const { rating, comments } = req.body;
  const userId = req.userId;

  if (!evaluationId) {
    return res.status(400).json({ message: "ID da avaliação é obrigatório!" });
  }

  try {
    await updateEvaluation(evaluationId, userId, { rating, comments });
    res.status(200).json({ message: "Avaliação atualizada com sucesso!" });
  } catch (error) {
    if (error.message.includes("Avaliação não encontrada") || error.message.includes("Permissão negada")) {
      return res.status(404).json({
        message: "Avaliação não encontrada.",
      });
    }
    res.status(500).json({
      message: "Erro ao atualizar a avaliação: " + error.message,
    });
  }
};


module.exports = { addEvalutationController, updateEvaluationController };
