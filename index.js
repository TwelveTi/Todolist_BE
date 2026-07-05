require("dotenv").config();
const express = require("express");
const route = require("./src/routes/index");
const connectDB = require("./src/utils/connectDB");
const cors = require('cors');
const rateLimit = require("express-rate-limit");
const helmet = require('helmet');
const http = require('http');

const app = express();
const server = http.createServer(app);

app.use(helmet());

app.use(cors({
  origin: process.env.FRONTEND_URL,
  credentials: true
}));

app.use(rateLimit({         // Chống spam request
  windowMs: 15 * 60 * 1000,
  max: 100
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

route(app);

connectDB().then(async () => {
  
  const port = process.env.PORT;
  const hostname = process.env.HOST_NAME || "localhost";

  server.listen(port, hostname, () => {
    console.log(`Server đang chạy tại http://${hostname}:${port}`);
  });
});