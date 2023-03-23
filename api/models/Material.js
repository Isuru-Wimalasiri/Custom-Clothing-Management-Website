import mongoose from 'mongoose';

const materialSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  description: {
    type: String,
    required: true,
  },
  unitPrice: {
    type: String,
    required: false,
  },
  availableUnits: {
    type: String,
    required: false,
  },
});

export default mongoose.model('Material', materialSchema);
