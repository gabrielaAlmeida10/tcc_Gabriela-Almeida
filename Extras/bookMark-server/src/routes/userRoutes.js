const express = require("express");
const multer = require("multer");

const {
  registerUser,
  login,
  logout,
  updateProfilePictureController,
  editUserController,
  deleteUserAccount
} = require("../controllers/userController");

const authMiddleware = require('../middleware/authMiddleware');


const router = express.Router();

const upload = multer({ storage: multer.memoryStorage() });


router.post(
  "/registerUser",
  upload.fields([{ name: "profilePicture", maxCount: 1 }]),
  registerUser
);

router.post("/login", login);

router.post("/logout", logout);

router.put(
  "/:userId/profile-picture",
  upload.single("profileImage"),
  updateProfilePictureController
);

router.put("/:userId", upload.single("profileImage"), editUserController);

router.delete("/deleteAccount", authMiddleware, deleteUserAccount);


module.exports = router;
