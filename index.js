require("dotenv").config();
const express = require("express");
const route = require("./src/routes/index");
const connectDB = require("./src/utils/connectDB");
const notFound = require("./src/middlewares/notFound");
const errorHandler = require("./src/middlewares/errorHandler");
const cors = require('cors');
const rateLimit = require("express-rate-limit");
const helmet = require('helmet');
const http = require('http');

const app = express();
const server = http.createServer(app);
const corsOrigin = process.env.FRONTEND_URL || true;

app.use(helmet());

app.use(cors({
  origin: corsOrigin,
  credentials: true
}));

app.use(rateLimit({         // Chống spam request
  windowMs: 15 * 60 * 1000,
  max: 100
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

route(app);

app.use(notFound);
app.use(errorHandler);

connectDB().then(async () => {
  
  const port = process.env.PORT || 3000;
  const hostname = process.env.HOST_NAME || "localhost";

  server.listen(port, hostname, () => {
    console.log(`Server đang chạy tại http://${hostname}:${port}`);
  });
});
