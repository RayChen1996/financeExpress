const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');


const JWT_SECRET = 'super_secret_key';


const UserSchema = new mongoose.Schema({
  username: String,
  password: String,
});


const User = mongoose.model('User', UserSchema);

/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: 用戶註冊
 *     description: 註冊新用戶
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 description: 用戶名
 *               password:
 *                 type: string
 *                 description: 密碼
 *     responses:
 *       201:
 *         description: 註冊成功
 *       500:
 *         description: 註冊失敗
 */
router.post('/register', async (req, res) => {
  const { username, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = new User({ username, password: hashedPassword });
  await user.save();
  res.status(201).json({ message: 'User registered successfully' });
});





/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: 用戶登錄
 *     description: 使用用戶名和密碼登錄
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: 登錄成功
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   description: JWT token
 *       401:
 *         description: 登錄失敗
 */
router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });

  if (user && (await bcrypt.compare(password, user.password))) {
    const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: '1h' });
    res.status(200).json({ token });
  } else {
    res.status(401).json({ message: 'Invalid credentials' });
  }
});

module.exports = router;
