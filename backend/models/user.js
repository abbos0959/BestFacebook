const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
   {
      first_name: {
         type: String,
         required: [true, "siz ism kiritishingiz shart"],
         trim: true,
         text: true,
      },
      last_name: {
         type: String,
         required: [true, "siz familiya kiritishingiz shart"],
         trim: true,
         text: true,
      },
      username: {
         type: String,
         required: [true, "siz username kiritishingiz shart"],
         trim: true,
         text: true,
         unique: true,
      },

      email: {
         type: String,
         required: [true, "siz email kiritishingiz shart"],
         trim: true,
         unique: true,
      },
      password: {
         type: String,
         required: [true, "siz password kiritishingiz shart"],
      },
      picture: {
         type: String,
         trim: true,
         default:
            "https://www.kindpng.com/imgv/iwoxbb_user-profile-default-image-png-clipart-png-download/",
      },
      cover: {
         type: String,
         trim: true,
      },
      gender: {
         type: String,
         trim: true,
         required: [true, "siz gender kiritishingiz shart"],
      },
      bYear: {
         type: Number,
         required: true,
         trim: true,
      },
      bMonth: {
         type: Number,
         required: true,
         trim: true,
      },
      bDay: {
         type: Number,
         required: true,
         trim: true,
      },

      verified: {
         type: Boolean,
         default: false,
      },
      friends: {
         type: Array,
         default: [],
      },
      following: {
         type: Array,
         default: [],
      },
      followers: {
         type: Array,
         default: [],
      },
      requests: {
         type: Array,
         default: [],
      },
      search: [
         {
            user: {
               type: mongoose.Schema.Types.ObjectId,
               ref: "User",
            },
         },
      ],
      details: {
         bio: { type: String },
         otherName: { type: String },
         job: { type: String },
         workplace: { type: String },
         college: { type: String },
         highSchool: { type: String },

         currentCity: { type: String },
         hometown: { type: String },
         relationship: {
            type: String,
            enum: ["Single", "In a relationship", "Married", "Divorced"],
         },
         instagram: { type: String },
      },

      savedPost: [
         {
            post: {
               type: mongoose.Schema.Types.ObjectId,
               ref: "Post",
            },
            savedat: {
               type: Date,
               default: new Date(),
            },
         },
      ],
   },
   {
      timestamps: true,
   }
);

module.exports = mongoose.model("User", userSchema);
