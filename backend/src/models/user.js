import mongoose from 'mongoose';
import bcrypt from "bcrypt";

const userschema=mongoose.Schema({
    fullname: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
    },
    profilepic: {
      type: String,
      default: "",
    },
},{timestamps:true});

//pre-save hook middleware ->runs when new document is saved to db
//hash password when new user is added
userschema.pre("save", async function (next) {
  if (!this.isModified("password")) return next(); // Only hash if password is modified or new

  try {
    //Salt adds randomness, so even same passwords look different
    const salt = await bcrypt.genSalt(10); //no of rounds
    this.password = await bcrypt.hash(this.password, salt);
    next();  //We're done with our async operation, continue saving the document
  } catch (err) {
    next(err);  //An error occurred, don’t save, and pass this error to Mongoose
  }
});

const User = mongoose.model("User", userschema);
export default User;