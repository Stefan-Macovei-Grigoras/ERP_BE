// // 📁 src/app.js
// const express = require('express');
// const cors = require('cors');
// const helmet = require('helmet');
// const rateLimit = require('express-rate-limit');
// require('dotenv').config();

// const app = express();

// // Middleware
// app.use(helmet());
// app.use(cors({ origin: process.env.CORS_ORIGIN || '*' }));
// app.use(express.json());

// // Rate limiter (prevent abuse)
// const limiter = rateLimit({
//   windowMs: 15 * 60 * 1000,
//   max: 100,
// });
// app.use(limiter);

// // Routes
// const indexRoutes = require('./routes/index');
// app.use(express.json());
// app.use(indexRoutes);

// // Optional: Error handling middleware
// // const errorHandler = require('./middlewares/error.middleware');
// // app.use(errorHandler);

// module.exports = app;
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
require('dotenv').config();

const app = express();

const allowedOrigins = [
  'https://erp-fe-five.vercel.app',
  'http://localhost:3000',
  'http://localhost:5173'
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  }
}));

// Middleware
app.use(helmet());
app.use(express.json());

// Rate limiter (prevent abuse)
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 150,
});
app.use(limiter);

// Routes
const indexRoutes = require('./routes/index');
app.use(indexRoutes);

// Optional: Error handling middleware
// const errorHandler = require('./middlewares/error.middleware');
// app.use(errorHandler);

module.exports = app;