require('dotenv').config();
const express = require('express');
const connectDB = require('./config/database');
const customerAuthRouter = require('./routes/customerAuth');

const app = express();

app.use(express.json()); 
app.use('/', customerAuthRouter);

connectDB()
  .then(() => {
    console.log("Database connected...");
    app.listen(process.env.PORT || 5555, () => {
      console.log("Server running on port 5555");
    });
  })
  .catch((err) => {
    console.log("DB connection failed:", err.message);
  });