const mongoose = required('mongoose');

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  measurements: [
    {
      measurementName: {
        type: String,
        required: true,
      },
    },
  ],
});

module.exports('category', categorySchema);
