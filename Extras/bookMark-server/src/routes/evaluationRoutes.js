const express = require("express");
const router = express.Router();

const {addEvalutationController, updateEvaluationController} = require("../controllers/evaluationController");
const authMiddleware = require("../middleware/authMiddleware");

router.post("/addEvaluation", authMiddleware, addEvalutationController);
router.put('/:evaluationId', authMiddleware, updateEvaluationController);

module.exports = router;