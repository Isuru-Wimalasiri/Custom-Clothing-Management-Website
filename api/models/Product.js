const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  category: {
    type: Schema.Types.ObjectId,
    ref: 'Category',
    required: true,
  },
  subCategory: {
    type: String,
    required: false,
  },
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
      required: true,
    },
    percentage: {
      type: Number,
      required: true,
    },
  },
  image: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('product', productSchema);
