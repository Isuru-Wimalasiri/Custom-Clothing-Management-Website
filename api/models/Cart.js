import mongoose from 'mongoose';

const CartSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true },

    productId: {
      type: mongoose.Schema.ObjectId,
      ref: 'Product',
      required: true,
    },
    materialId: {
      type: mongoose.Schema.ObjectId,
      ref: 'Material',
      required: true,
    },
    sizes: [
      {
        name: { type: String, required: true },
        size: { type: Number, required: true },
      },
    ],
    quantity: {
      type: Number,
      default: 1,
    },
  },

  { timestamps: true }
);

export default mongoose.model('Cart', CartSchema);
