const mongoose = require('mongoose')

const questionSchema = new mongoose.Schema({
  content: {
    type: String,
    required: [true, '问题内容不能为空'],
    trim: true
  },
  answer: {
    type: String,
    required: [true, '答案不能为空'],
    trim: true
  },
  explanation: {
    type: String,
    trim: true
  },
  difficulty: {
    type: String,
    enum: ['easy', 'medium', 'hard'],
    default: 'medium'
  },
  tags: {
    type: [String],
    default: []
  }
}, {
  timestamps: true
})

module.exports = mongoose.model('Question', questionSchema)