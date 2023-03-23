import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
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
  sizes: [
    {
      measurementName: {
        type: String,
      },
      value: {
        type: Number,
      },
    },
  ],
  isAdmin: {
    type: Boolean,
    default: false,
  },
});

export default mongoose.model('User', userSchema);
