const express = require('express')
const Question = require('../models/Question')
const router = express.Router()

// 获取所有问题
router.get('/', async (req, res, next) => {
  try {
    const questions = await Question.find()
    res.json(questions)
  } catch (err) {
    next(err)
  }
})

// 添加新问题
router.post('/', async (req, res, next) => {
  try {
    console.log('收到问题创建请求，数据:', JSON.stringify(req.body, null, 2))
    
    // 检查必填字段
    if (!req.body.content) {
      return res.status(400).json({
        error: '缺少必填字段',
        requiredFields: ['content', 'answer'],
        received: Object.keys(req.body)
      })
    }

    const question = new Question({
      content: req.body.content,
      answer: req.body.answer || '',
      difficulty: req.body.difficulty || 'easy'
    })

    const savedQuestion = await question.save()
    console.log('问题保存成功:', savedQuestion)
    res.status(201).json(savedQuestion)
  } catch (err) {
    console.error('问题保存失败:', err)
    if (err.name === 'ValidationError') {
      res.status(400).json({
        error: '数据验证失败',
        message: err.message,
        details: Object.values(err.errors).map(e => ({
          field: e.path,
          message: e.message
        })),
        receivedData: req.body
      })
    } else {
      next(err)
    }
  }
})

// 更新问题
router.patch('/:id', async (req, res, next) => {
  try {
    const updatedQuestion = await Question.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    )
    if (!updatedQuestion) {
      return res.status(404).json({ message: '问题未找到' })
    }
    res.json(updatedQuestion)
  } catch (err) {
    next(err)
  }
})

// 删除问题
router.delete('/:id', async (req, res, next) => {
  try {
    const deletedQuestion = await Question.findByIdAndDelete(req.params.id)
    if (!deletedQuestion) {
      return res.status(404).json({ message: '问题未找到' })
    }
    res.json({ message: '问题已删除' })
  } catch (err) {
    next(err)
  }
})

module.exports = router