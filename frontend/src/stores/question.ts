import { defineStore } from 'pinia'
import { ref } from 'vue'
import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api/questions'

interface Question {
  _id: string
  content: string
  answer: string
  explanation?: string
  difficulty: 'easy' | 'medium' | 'hard'
  tags: string[]
  createdAt?: string
  updatedAt?: string
}

export const useQuestionStore = defineStore('question', () => {
  const questions = ref<Question[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)

  const fetchQuestions = async () => {
    try {
      loading.value = true
      const response = await axios.get(API_URL)
      questions.value = response.data
    } catch (err) {
      error.value = '获取问题列表失败'
      console.error(err)
    } finally {
      loading.value = false
    }
  }

  const addQuestion = async (question: Omit<Question, '_id'>) => {
    try {
      const response = await axios.post(API_URL, question)
      questions.value.push(response.data)
      return response.data
    } catch (err) {
      error.value = '添加问题失败'
      console.error(err)
      throw err
    }
  }

  const updateQuestion = async (updatedQuestion: Question) => {
    try {
      const response = await axios.put(`${API_URL}/${updatedQuestion._id}`, updatedQuestion)
      const index = questions.value.findIndex(q => q._id === updatedQuestion._id)
      if (index !== -1) {
        questions.value[index] = response.data
      }
    } catch (err) {
      error.value = '更新问题失败'
      console.error(err)
      throw err
    }
  }

  const removeQuestion = async (id: string) => {
    try {
      await axios.delete(`${API_URL}/${id}`)
      questions.value = questions.value.filter(q => q._id !== id)
    } catch (err) {
      error.value = '删除问题失败'
      console.error(err)
      throw err
    }
  }

  const getQuestionById = (id: string) => {
    return questions.value.find(q => q._id === id)
  }

  // 初始化时加载数据
  fetchQuestions()

  return {
    questions,
    loading,
    error,
    fetchQuestions,
    addQuestion,
    updateQuestion,
    removeQuestion,
    getQuestionById
  }
})