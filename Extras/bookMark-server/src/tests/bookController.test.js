const { listBooks, editBook } = require("../controllers/bookController");
const { getUserBooks, updateBook } = require("../models/bookModel");
const { getAuth } = require("firebase/auth");

jest.mock("../models/bookModel");
jest.mock("firebase/auth");

describe("Book Controller Tests", () => {
  const mockToken = "mocked.jwt.token";
  const mockUserId = "mockUserId";
  
  const req = {
    userId: mockUserId,
    params: { bookId: "mockBookId" },
    body: { title: "Updated Title" },
    headers: { authorization: `Bearer ${mockToken}` },
    files: {
      imageFile: [{ originalname: "image.jpg", buffer: Buffer.from("mock image data") }],
      bookFile: [{ originalname: "book.pdf", buffer: Buffer.from("mock book data") }],
    },
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

  test("Should list books for a user", async () => {
    getUserBooks.mockResolvedValue([{ id: "1", title: "Mocked Book", userId: mockUserId }]);

    await listBooks(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith([{ id: "1", title: "Mocked Book", userId: mockUserId }]);
  });

  test("Should update book details for a user", async () => {
    updateBook.mockResolvedValue({
      id: req.params.bookId,
      title: req.body.title,
      userId: mockUserId,
      imageUrl: "https://mocked-url.com/image.jpg",
      bookUrl: "https://mocked-url.com/book.pdf",
    });

    await editBook(req, res);

    expect(updateBook).toHaveBeenCalledWith(
      req.params.bookId,
      req.body,
      req.files.imageFile[0],
      req.files.bookFile[0],
      mockUserId
    );
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      id: req.params.bookId,
      title: req.body.title,
      userId: mockUserId,
      imageUrl: "https://mocked-url.com/image.jpg",
      bookUrl: "https://mocked-url.com/book.pdf",
    });
  });
});
