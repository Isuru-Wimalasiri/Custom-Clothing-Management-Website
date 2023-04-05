import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
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
    },
    primaryAddress: {
      type: String,
      required: false,
    },
    contactNumber: {
      type: String,
      required: false,
    },
    gender: {
      type: String,
      required: true,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    profilePic: {
      type: String,
    },
    zipCode: {
      type: String,
    },
    country: {
      type: String,
    },
  },
  { timestamps: true }
);

export default mongoose.model('User', userSchema);
