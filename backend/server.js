const express = require("express");
const router = require("./routes/auth_routes");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./utils/db");
const trouter = require("./routes/tweets_routes");
dotenv.config();

const app = express();


app.use(cors({
  origin: 'http://localhost:5173',
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
}));

app.use(express.json());
app.use("/", router);
app.use("/tweets", trouter);

connectDB();

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`Serving at  http://localhost:${PORT}...`);
});
