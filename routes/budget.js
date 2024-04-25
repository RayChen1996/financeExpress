const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

// 预算模型
const BudgetSchema = new mongoose.Schema({
  userId: mongoose.Types.ObjectId,
  category: String,
  limit: Number,
  date: { type: Date, default: Date.now },
});

const Budget = mongoose.model('Budget', BudgetSchema);

/**
 * @swagger
 * /budget:
 *   post:
 *     summary: 设置预算
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: string
 *               category:
 *                 type: string
 *               limit:
 *                 type: number
 *     responses:
 *       201:
 *         description: 设置成功
 */
router.post('/', async (req, res) => {
  const { userId, category, limit } = req.body;
  const budget = new Budget({ userId, category, limit });
  await budget.save();
  res.status(201).json({ message: 'Budget set successfully' });
});

/**
 * @swagger
 * /budget:
 *   get:
 *     summary: 查看所有预算
 *     responses:
 *       200:
 *         description: 成功返回预算记录
 */
router.get('/', async (req, res) => {
  const budgets = await Budget.find();
  res.status(200).json(budgets);
});

module.exports = router;
