const express = require("express");
const cors = require("cors");
const color = require("colors");

const DB = require("./connect/db");
require("dotenv").config();
DB();

const userRouter = require("./routers/user");
const app = express();
app.use(express.json());

const options = {
   origin: "http://localhost:3000",
   useSuccessStatus: 200,
};
app.use(cors(options));

app.use("/", userRouter);

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
   console.log(`server ishladi   ${PORT}`.yellow.underline.bold);
});

//qbZZp27c0u5sbBnu
