const express = require("express");
const multer = require("multer");
const {
  listBooks,
  createBook,
  editBook,
  removeBook,
} = require("../controllers/bookController");

const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();
const upload = multer();

router.get("/books", authMiddleware, listBooks);

router.post(
  "/create",
  upload.fields([{ name: "imageFile" }, { name: "bookFile" }]),
  authMiddleware,
  createBook
);

router.put(
  "/:bookId",
  upload.fields([{ name: "imageFile" }, { name: "bookFile" }]),
  authMiddleware,
  editBook
);

router.delete("/:bookId", authMiddleware, removeBook);

module.exports = router;
