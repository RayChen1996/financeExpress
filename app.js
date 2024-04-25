
const express = require('express');
const bodyParser = require('body-parser'); // 確保已導入
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const mongoose = require('mongoose');
const PORT = 3001;

const app = express();

// 连接 MongoDB
const MONGO_URI = 'mongodb+srv://ray10315332:GayqbQeJq5Jxh3em@cluster0.pberq7k.mongodb.net/finance';
mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('Connected to MongoDB');
}).catch((err) => {
  console.error('MongoDB connection error:', err);
});

// Swagger 配置
const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'Finance Management API',
    version: '1.0.0',
    description: 'An API for managing personal finances',
  },
  servers: [{ url: `http://localhost:${PORT}`, description: 'Local server' }],
};

const swaggerOptions = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'Finance Management API',
      version: '1.0.0',
      description: 'API for managing personal finances',
    },
    servers: [{ url: `http://localhost:${PORT}`, description: 'Local server' }],
  },
  apis: ['./routes/*.js'], // 此處包含所有路由
};

const swaggerSpec = swaggerJSDoc(swaggerOptions);

// 启用中间件
app.use(logger('dev'));
app.use(express.json());
app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

// 设置 Swagger UI
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// 导入路由
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const authRouter = require('./routes/auth');
const incomeRouter = require('./routes/income');
const expenseRouter = require('./routes/expense');
const budgetRouter = require('./routes/budget');
const reportRouter = require('./routes/report');

// 应用路由
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/auth', authRouter);
app.use('/income', incomeRouter);
app.use('/expense', expenseRouter);
app.use('/budget', budgetRouter);
app.use('/report', reportRouter);

// 启动服务器
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

module.exports = app;
