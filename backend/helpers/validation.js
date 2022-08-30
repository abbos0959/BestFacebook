const user = require("../models/user");

const validateEmail = (email) => {
   return String(email)
      .toLowerCase()
      .match(
         /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
};

const validateLength = (text, min, max) => {
   if (text.length > max || text.length < min) {
      return false;
   }
   return true;
};

const validateUsername = async (username) => {
   let a = false;
   do {
      let check = await user.findOne({ username });
      if (check) {
         username += (+new Date() * Math.random()).toString().substring(0, 1);
         a = true;
      } else {
         a = false;
      }
   } while (a)
   return username
};
module.exports = { validateEmail, validateLength, validateUsername };
