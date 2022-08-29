const express = require("express");
const cors = require("cors");
const color = require("colors");
const DB = require("./connect/db");
require("dotenv").config();
DB();

const app = express();

const options = {
   origin: "http://localhost:3000",
   useSuccessStatus: 200,
};
app.use(cors(options));

app.use("/", (req, res) => {
   res.send("salom");
});

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
   console.log(`server ishladi   ${PORT}`.yellow.underline.bold);
});

//qbZZp27c0u5sbBnu
