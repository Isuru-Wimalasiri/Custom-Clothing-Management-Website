import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  category: {
    type: mongoose.Schema.ObjectId,
    ref: 'Category',
    required: true,
  },
  subCategory: {
    type: String,
    required: false,
  },
  gender: {
    type: String,
    required: true,
  },
  mesurements: [{ type: String, required: true }],
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: false,
  },
  discount: {
    active: {
      type: Boolean,
      required: false,
    },
    percentage: {
      type: Number,
      required: false,
    },
  },
  image: {
    type: String,
    required: false,
  },
});

export default mongoose.model('Product', productSchema);
