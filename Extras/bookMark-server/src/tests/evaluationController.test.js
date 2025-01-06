jest.mock("../models/evaluationModel", () => ({
  createEvaluation: jest.fn(),
  updateEvaluation: jest.fn(),
}));

const { addEvalutationController, updateEvaluationController } = require("../controllers/evaluationController");
const { createEvaluation, updateEvaluation } = require("../models/evaluationModel");

const res = {
  status: jest.fn().mockReturnThis(),
  json: jest.fn().mockReturnThis(),
};

describe("Evaluation Controller Tests", () => {
  beforeEach(() => {
    jest.clearAllMocks(); 
  });

  test("Should create evaluation successfully", async () => {
    const req = {
      body: { bookId: "mockBookId", rating: 5, comments: "Excelente livro!" },
      userId: "mockUserId",
    };

    createEvaluation.mockResolvedValue({
      id: "mockEvaluationId",
      userId: "mockUserId",
      bookId: "mockBookId",
      rating: 5,
      comments: "Excelente livro!",
      createdAt: expect.any(Date),
    });

    await addEvalutationController(req, res);

    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({
      id: "mockEvaluationId",
      userId: "mockUserId",
      bookId: "mockBookId",
      rating: 5,
      comments: "Excelente livro!",
      createdAt: expect.any(Date),
    });
  });

  test("Should return error when missing mandatory fields", async () => {
    const req = {
      body: { bookId: "mockBookId", comments: "good book" }, 
      userId: "mockUserId",
    };

    await addEvalutationController(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      message: "Todos os campos obrigatórios devem ser preenchidos.",
    });
  });

  test("Should return error when updating non-existent evaluation", async () => {
    const req = {
      params: { evaluationId: "invalidEvaluationId" },
      userId: "mockUserId",
      body: { rating: 4, comments: "Comentário atualizado" },
    };

    updateEvaluation.mockRejectedValue(new Error("Avaliação não encontrada."));

    await updateEvaluationController(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({
      message: "Avaliação não encontrada.",
    });
  });
});
