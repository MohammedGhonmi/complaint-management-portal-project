const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const { Promise } = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: [true, "Username is required"],
      unique: true,
      minlength: [6, "Username must be at least 6, got {VALUE}"],
      maxlength: 50,
      lowercase: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      maxlength: 100,
      validate: {
        validator: (v) => {
          const patt = new RegExp(
            "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%#^*?&]{8,}$"
          );
          console.log(patt.test(v));
          return patt.test(v);
        },
        message: () =>
          `Password must be minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character!`,
      },
    },
    role: {
      type: String,
      required: true,
      enum: {
        values: ["admin", "customer"],
        message: "{VALUE} is not supported",
      },
    },
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

userSchema.statics.login = async (username, password) => {
  return new Promise(async (resolve, reject) => {
    const user = await User.findOne({ username });
    if (user) {
      const auth = await bcrypt.compare(password, user.password);
      if (auth) {
        resolve({
          _id: user._id,
          username: user.username,
          role: user.role,
        });
      }
      reject(new Error("incorrect password"));
    }
    reject(new Error("incorrect username"));
  });
};

const User = mongoose.model("User", userSchema);

module.exports = User;
