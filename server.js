const express = require('express');
const dotenv = require('dotenv');
const path = require('path');
const colors = require('colors');
const morgan = require('morgan');
const connectDB = require('./config/db');

const app = express();

dotenv.config({ path: './config/config.env' });

connectDB();

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use(express.json());

// routes
const transactionsRoutes = require('./routes/transactions');

app.use('/api/v1/transactions', transactionsRoutes);

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
  app.get('*', (req, res) => res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html')));
}

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running in ${process.env.NODE_ENV} mode at http://localhost:${PORT}`.yellow.bold));