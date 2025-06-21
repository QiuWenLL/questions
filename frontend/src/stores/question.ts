import { defineStore } from 'pinia'
import { ref } from 'vue'

interface Question {
  id: string
  content: string
  answer: string
  explanation?: string
  difficulty: 'easy' | 'medium' | 'hard'
  tags: string[]
}

export const useQuestionStore = defineStore('question', () => {
  const questions = ref<Question[]>([
    {
      id: '1',
      content: 'Vue 3中Composition API和Options API的主要区别是什么？',
      answer: 'Composition API提供了更好的逻辑复用和代码组织能力，而Options API基于选项组织代码。',
      explanation: 'Composition API允许将相关逻辑组织在一起，而不是分散在不同的选项中。这使得代码更易于维护和复用。',
      difficulty: 'medium',
      tags: ['Vue', 'Composition API']
    },
    {
      id: '2',
      content: '什么是虚拟DOM？它有什么优势？',
      answer: '虚拟DOM是真实DOM的轻量级JavaScript表示，通过diff算法最小化DOM操作。',
      explanation: '虚拟DOM的优势包括：1) 提高性能，2) 跨平台能力，3) 简化DOM操作',
      difficulty: 'easy',
      tags: ['React', 'Vue', 'DOM']
    }
  ])

  const addQuestion = (question: Omit<Question, 'id'>) => {
    const newQuestion = {
      ...question,
      id: Date.now().toString()
    }
    questions.value.push(newQuestion)
    return newQuestion
  }

  const updateQuestion = (updatedQuestion: Question) => {
    const index = questions.value.findIndex(q => q.id === updatedQuestion.id)
    if (index !== -1) {
      questions.value[index] = updatedQuestion
    }
  }

  const removeQuestion = (id: string) => {
    questions.value = questions.value.filter(q => q.id !== id)
  }

  const getQuestionById = (id: string) => {
    return questions.value.find(q => q.id === id)
  }

  return {
    questions,
    addQuestion,
    updateQuestion,
    removeQuestion,
    getQuestionById
  }
})