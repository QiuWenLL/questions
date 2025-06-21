import { defineStore } from 'pinia'
import api from '@/api'
import type { Question } from '@/types/question'

interface QuestionState {
  questions: Question[]
  currentQuestion: Question | null
}

export const useQuestionStore = defineStore('question', {
  state: (): QuestionState => ({
    questions: [],
    currentQuestion: null
  }),
  actions: {
    async fetchQuestions() {
      try {
        const response = await axios.get('/questions')
        this.questions = response.data
      } catch (error) {
        console.error('获取题目列表失败:', error)
        throw error
      }
    },
    async fetchQuestionById(id: number) {
      try {
        const response = await axios.get(`/questions/${id}`)
        this.currentQuestion = response.data
      } catch (error) {
        console.error('获取题目详情失败:', error)
        throw error
      }
    },
    async createQuestion(question: Omit<Question, 'id'>) {
      try {
        const response = await axios.post('/questions', question)
        this.questions.push(response.data)
        return response.data
      } catch (error) {
        console.error('创建题目失败:', error)
        throw error
      }
    },
    async updateQuestion(question: Question) {
      try {
        const response = await axios.put(`/questions/${question.id}`, question)
        const index = this.questions.findIndex(q => q.id === question.id)
        if (index !== -1) {
          this.questions.splice(index, 1, response.data)
        }
        if (this.currentQuestion?.id === question.id) {
          this.currentQuestion = response.data
        }
        return response.data
      } catch (error) {
        console.error('更新题目失败:', error)
        throw error
      }
    },
    async deleteQuestion(id: number) {
      try {
        await axios.delete(`/questions/${id}`)
        this.questions = this.questions.filter(q => q.id !== id)
        if (this.currentQuestion?.id === id) {
          this.currentQuestion = null
        }
      } catch (error) {
        console.error('删除题目失败:', error)
        throw error
      }
    }
  }
})