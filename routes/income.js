const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

// 收入模型
const IncomeSchema = new mongoose.Schema({
  userId: mongoose.Types.ObjectId,
  source: String,
  amount: Number,
  date: { type: Date, default: Date.now },
});

const Income = mongoose.model('Income', IncomeSchema);

/**
 * @swagger
 * /income:
 *   post:
 *     summary: 添加收入记录
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: string
 *               source:
 *                 type: string
 *               amount:
 *                 type: number
 *     responses:
 *       201:
 *         description: 添加成功
 */
router.post('/', async (req, res) => {
  const { userId, source, amount } = req.body;
  const income = new Income({ userId, source, amount });
  await income.save();
  res.status(201).json({ message: 'Income record added successfully' });
});

/**
 * @swagger
 * /income:
 *   get:
 *     summary: 查看所有收入记录
 *     responses:
 *       200:
 *         description: 成功返回收入记录
 */
router.get('/', async (req, res) => {
  const incomes = await Income.find();
  res.status(200).json(incomes);
});

module.exports = router;
