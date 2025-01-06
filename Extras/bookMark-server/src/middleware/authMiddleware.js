// authMiddleware.js
const authMiddleware = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Token de autorização não fornecido!" });
  }

  const idToken = authHeader.split(" ")[1];

  try {
    const response = await fetch(
      `https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=${process.env.FIREBASE_API_KEY}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ idToken }),
      }
    );

    const data = await response.json();

    if (data.error) {
      return res.status(401).json({ error: "Token de autenticação inválido" });
    }

    req.userId = data.users[0].localId;
    next();
  } catch (error) {
    console.error("Erro ao verificar o token: ", error);
    return res.status(500).json({ error: "Erro ao verificar o token de autenticação!" });
  }
};

module.exports = authMiddleware; 
