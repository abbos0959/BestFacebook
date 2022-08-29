const mongoose = require("mongoose");

const DB = async (req, res) => {
   try {
      await mongoose.connect(process.env.DB_URL);
      console.log("mongodb ulandi".cyan.bold);
   } catch (error) {
      console.log("mongodb ulanmadi".cyan.red);
   }
};

module.exports = DB;
