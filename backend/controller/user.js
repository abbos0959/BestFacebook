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

      const token = generateToken({ id: data._id.toString() }, "7d");

      res.send({
         id: data._id,
         username: data.username,
         picture: data.picture,
         first_name: data.first_name,
         last_name: data.last_name,
         token: token,
         verified: data.verified,
         message: "register muvaffaqiyatli ! Iltimos emailingizni tasdiqlang ",
      });
   } catch (error) {
      res.status(500).json({
         message: error.message,
      });
   }
};

const activateAccount = async (req, res) => {
   try {
      const { token } = req.body;

      const usert = jwt.verify(token, process.env.TOKEN);
      console.log(usert);
      const check = await user.findById(usert.id);
      if (check.verified == true) {
         return res.status(200).json({ message: "siz allaqachon email tasdiqlagansiz" });
      } else {
         await user.findByIdAndUpdate(usert.id, { verified: true });
         return res.status(200).json({ message: "emailingiz muvafaqqiyatli tasdiqlandi" });
      }
   } catch (error) {
      res.status(500).json({
         message: "email verification error",
      });
   }
};

const login = async (req, res) => {
   try {
      const { email, password } = req.body;

      const usert = await user.findOne({ email });

      if (!usert) {
         return res.status(400).json({
            message: "bunday user mavjud emas",
         });
      }

      const check = await bcrypt.compare(password, usert.password);

      if (!check) {
         return res.status(400).json({
            message: "bunday user mavjud emas password",
         });
      }
      const token = generateToken({ id: usert._id.toString() }, "7d");

      res.send({
         id: usert._id,
         username: usert.username,
         picture: usert.picture,
         first_name: usert.first_name,
         last_name: usert.last_name,
         token: token,
         verified: usert.verified,
         message: "tizimga muvaffaqiyatli kirdingiz ",
      });
   } catch (error) {
      res.status(500).json({
         message: "login xatoligi",
      });
   }
};

module.exports = { register, activateAccount, login };
