import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
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
});

export default mongoose.model('User', userSchema);
