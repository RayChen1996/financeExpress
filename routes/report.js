const express = require('express');
const router = express.Router();

// 示例财务报告端点
/**
 * @swagger
 * /report:
 *   get:
 *     summary: 获取财务报告
 *     description: 返回所有收入和支出报告
 *     responses:
 *       200:
 *         description: 返回报告
 */
router.get('/', async (req, res) => {
  // 模拟报告数据
  const report = {
    totalIncome: 5000,
    totalExpense: 3000,
    budgets: [
      { category: 'Food', limit: 500, spent: 450 },
      { category: 'Transport', limit: 200, spent: 150 },
    ],
  };

  res.status(200).json(report);
});

module.exports = router;
