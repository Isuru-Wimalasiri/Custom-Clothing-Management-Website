import mongoose from 'mongoose';

const orderItemSchema = mongoose.Schema({
  customer: {
    type: Schema.Types.ObjectId,
    ref: 'customer',
    required: true,
  },
  product: {
    type: Schema.ty,
  },
});
