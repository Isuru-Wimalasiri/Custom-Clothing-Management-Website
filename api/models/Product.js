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
  subCategories: {
    type: [String],
    required: false,
  },
  gender: {
    type: String,
    required: true,
  },
  mesurements: [{ type: String, required: false }],
  description: {
    type: String,
    required: false,
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
  inStock: {
    type: Boolean,
    default: true,
  },
});

export default mongoose.model('Product', productSchema);
