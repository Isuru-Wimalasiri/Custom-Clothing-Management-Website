import mongoose from 'mongoose';

const sizeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  value: { type: Number, required: true },
});

const customOrderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: true,
    },
    material: {
      type: mongoose.Schema.ObjectId,
      ref: 'Material',
      required: true,
    },
    color: {
      type: String,
      required: true,
    },
    sizes: [sizeSchema],
    amount: { type: Number, required: true },
    address: { type: Object, required: true },
    status: { type: String, default: 'pending' },
  },
  { timestamps: true }
);

export default mongoose.model('CustomOrder', customOrderSchema);
