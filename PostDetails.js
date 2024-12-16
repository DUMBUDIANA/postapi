const mongoose = require('mongoose');

const PostDetailSchema = new mongoose.Schema({
  postId: { type: mongoose.Schema.Types.ObjectId, ref: 'Post', required: true },
  title: { type: String, required: true },
  paragraphs: [
    {
      text: { type: String, required: true } // Each paragraph has a `text` field
    }
  ],
  
  // paragraphs,
  date: { type: Date, default: Date.now }, // Automatically sets the date to the current timestamp
  extraDetail: { type: String, required: true },
  moreInfo: { type: String }
});

module.exports = mongoose.model('PostDetails', PostDetailSchema);
