const {
  createGoalController,
  addBookToGoalController,
  updateGoalProgressController,
} = require("../controllers/goalController");
const {
  createGoal,
  addBookToGoal,
  updateGoalProgress,
} = require("../models/goalModel");
const { getAuth } = require("firebase/auth");

jest.mock("../models/goalModel");
jest.mock("firebase/auth");

describe("Goal Controller Tests", () => {
  const mockUserId = "mockUserId";

  const req = {
    userId: mockUserId,
    params: { goalId: "goalIdExample" },
    body: { name: "Goal Test", totalBooks: 5, startDate: new Date(), book: { id: "bookIdExample" } },
  };

  const res = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
    getAuth.mockReturnValue({
      currentUser: { uid: mockUserId },
    });
  });

  test("Should create a new goal", async () => {
    createGoal.mockResolvedValue({
      id: "goalIdExample",
      name: req.body.name,
      totalBooks: req.body.totalBooks,
      startDate: req.body.startDate,
      userId: mockUserId,
    });

    await createGoalController(req, res);

    expect(createGoal).toHaveBeenCalledWith({
      name: req.body.name,
      totalBooks: req.body.totalBooks,
      startDate: req.body.startDate,
      userId: mockUserId,
    });
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({
      message: "Meta criada com sucesso!",
      newGoal: {
        id: "goalIdExample",
        name: req.body.name,
        totalBooks: req.body.totalBooks,
        startDate: req.body.startDate,
        userId: mockUserId,
      },
    });
  });

  test("Should add a book to a goal", async () => {
    addBookToGoal.mockResolvedValue();

    await addBookToGoalController(req, res);

    expect(addBookToGoal).toHaveBeenCalledWith(req.params.goalId, req.body.book.id);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      message: "Livro adicionado à meta com sucesso!",
    });
  });

  test("Should update goal progress", async () => {
    updateGoalProgress.mockResolvedValue();

    await updateGoalProgressController(req, res);

    expect(updateGoalProgress).toHaveBeenCalledWith(req.params.goalId);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      message: "Progresso da meta atualizado com sucesso!",
    });
  });
});
