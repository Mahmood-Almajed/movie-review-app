const mongoose = require('mongoose');
const commentSchema = new mongoose.Schema(
    {
      text: {
        type: String,
        required: true
      },
      rating: {
        type: Number,
        required: true
      },
      author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    },
    { timestamps: true }
  );