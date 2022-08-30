const user = require("../models/user");
const { validateEmail, validateLength, validateUsername } = require("../helpers/validation");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { generateToken } = require("../helpers/token");
const sendverificationEmail = require("../helpers/mailer");

const register = async (req, res, next) => {
   const { first_name, last_name, email, password, username, bYear, bMonth, bDay, gender } =
      req.body;
   try {
      if (!validateEmail(req.body.email)) {
         return res.status(400).json({
            message: "email xato kiritildi",
         });
      }
      const check = await user.findOne({ email: req.body.email });
      if (check) {
         return res.status(400).json({
            message: "bu email allaqachon mavjud",
         });
      }

      if (!validateLength(req.body.first_name, 3, 30)) {
         return res.status(400).json({
            message: "ismingiz  oralig`i 3 yoki 30 simvoldan iborat bo`lishi kerak",
         });
      }
      if (!validateLength(req.body.last_name, 3, 30)) {
         return res.status(400).json({
            message: "familiyangiz  oralig`i 3 yoki 30 simvoldan iborat bo`lishi kerak",
         });
      }

      if (!validateLength(req.body.password, 4, 16)) {
         return res.status(400).json({
            message: "password  oralig`i 4 yoki 16 simvoldan iborat bo`lishi kerak",
         });
      }

      const hashPassword = await bcrypt.hash(password, 12);
      const tempUsername = first_name + last_name;
      let newUsername = await validateUsername(tempUsername);
      const data = await user.create({
         first_name,
         last_name,
         email,
         password: hashPassword,
         username: newUsername,
         bYear,
         bMonth,
         bDay,
         gender,
      });

      const emailverificationtoken = generateToken({ id: data._id.toString() }, "30m");
      const url = `${process.env.BASE_URL}/activate/${emailverificationtoken}`;
      sendverificationEmail(data.email, data.first_name, url);
      res.status(200).json({
         data,
      });
   } catch (error) {
      res.status(500).json({
         message: error.message,
      });
   }
};

module.exports = { register };
