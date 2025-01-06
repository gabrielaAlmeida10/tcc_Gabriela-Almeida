require("dotenv").config();

const express = require("express");
const bookRoutes = require("./routes/bookRoutes");
const userRoutes = require("./routes/userRoutes");
const goalRoutes = require("./routes/goalRoutes");
const evaluationRoutes = require("./routes/evaluationRoutes");
const app = express();

app.use(express.json());


app.use("/api/books", bookRoutes); 
app.use("/api/users", userRoutes);
app.use("/api/goals", goalRoutes);
app.use("/api/evaluations", evaluationRoutes);

app.listen(3000, () => {
  console.log("Servidor rodando na porta 3000");
});