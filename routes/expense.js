const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

// 支出模型
const ExpenseSchema = new mongoose.Schema({
  userId: mongoose.Types.ObjectId,
  category: String,
  amount: Number,
  date: { type: Date, default: Date.now },
});

const Expense = mongoose.model('Expense', ExpenseSchema);

/**
 * @swagger
 * /expense:
 *   post:
 *     summary: 添加支出记录
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
 *               amount:
 *                 type: number
 *     responses:
 *       201:
 *         description: 添加成功
 */
router.post('/', async (req, res) => {
  const { userId, category, amount } = req.body;
  const expense = new Expense({ userId, category, amount });
  await expense.save();
  res.status(201).json({ message: 'Expense record added successfully' });
});

/**
 * @swagger
 * /expense:
 *   get:
 *     summary: 查看所有支出记录
 *     responses:
 *       200:
 *         description: 成功返回支出记录
 */
router.get('/', async (req, res) => {
  const expenses = await Expense.find();
  res.status(200).json(expenses);
});

module.exports = router;
