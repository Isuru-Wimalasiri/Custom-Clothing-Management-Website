import mongoose from 'mongoose';

const materialSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  image: {
    type: [String],
    required: false,
  },
  description: {
    type: String,
    required: false,
  },
  unitPrice: {
    type: Number,
    required: true,
  },
  availability: {
    type: Boolean,
    required: false,
  },
  colors: [
    {
      name: { type: String, required: true },
      colorImg: { type: String, required: false },
    },
  ],
});

export default mongoose.model('Material', materialSchema);
