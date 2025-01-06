const { updateEmail } = require("firebase/auth");
const { auth } = require("../firebase");
const {
  createUser,
  loginUser,
  logoutUser,
  updateProfilePicture,
  updateUser,
 deleteUserData
} = require("../models/userModel");

const registerUser = async (req, res) => {
  const { name, email, password } = req.body;
  const profilePicture = req.files ? req.files["profilePicture"][0] : null;

  if (!email || !password) {
    return res.status(400).json({ message: "Email e senha são obrigatórios" });
  }

  try {
    const userData = { name, email, password };
    const newUser = await createUser(userData, profilePicture);
    res
      .status(201)
      .json({ message: "User registered successfully! ", newUser });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const userData = await loginUser(email, password);

    res
      .status(200)
      .json({ message: "User logged in successfully!  ", userData });

  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const logout = async (req, res) => {
  try {
    await logoutUser();
    res.status(200).json({ message: "User logged out successfully! " });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const updateProfilePictureController = async (req, res) => {
  try {
    const userId = req.params.userId;

    const profileImage = req.file;

    if (!userId) {
      return res.status(400).json({ error: "User ID está indefinido." });
    }
    if (!profileImage) {
      return res.status(400).json({ error: "Nenhuma imagem enviada!" });
    }

    const profileImageUrl = await updateProfilePicture(userId, profileImage);

    res
      .status(200)
      .json({ message: "Foto de perfil atualizada!", profileImageUrl });

  } catch (error) {
    console.error(error);
    res.status(400).json({ error: error.message });
  }
};


const editUserController = async (req, res) => {
  try {
    const userId = req.params.userId;
    const { name, email } = req.body;
    const profileImage = req.file;

    const userData = {};

    if (name) userData.name = name;

    const user = auth.currentUser;
    if (email && user) {
      await updateEmail(user, email);
      userData.email = email;
    }

    const updateMessage = await updateUser(userId, userData);

    let profileImageUrl;
    if (profileImage) {
      profileImageUrl = await updateProfilePicture(userId, profileImage);
      userData.profilePictureUrl = profileImageUrl;
    }

    res.status(200).json({
      message: updateMessage,
      profileImageUrl: profileImageUrl || "Imagem não alterada",
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};


const deleteUserAccount = async (req, res) => {
  const userId = req.userId;

  try {
    await deleteUserData(userId);

    const idToken = req.headers.authorization.split(" ")[1]; 
    const apiKey = process.env.FIREBASE_API_KEY;

    const response = await fetch(
      `https://identitytoolkit.googleapis.com/v1/accounts:delete?key=${apiKey}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ idToken }),
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`Erro ao deletar usuário no Authentication: ${errorData.error.message}`);
    }

    res.status(200).json({ message: "Conta e dados excluídos com sucesso!" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  registerUser,
  login,
  logout,
  updateProfilePictureController,
  editUserController,
  deleteUserAccount,
};

