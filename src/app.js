require('dotenv').config();
const express = require('express');
const connectDB = require('./config/database');

const app = express();

connectDB()
  .then(() => {
    console.log("Database connected...");
    app.listen(process.env.PORT || 7777, () => {
      console.log("Server running on port 7777");
    });
  })
  .catch((err) => {
    console.log("DB connection failed:", err.message);
  });