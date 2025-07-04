<template>
  <div class="question-list">
    <h2>题目列表</h2>
    <div class="actions">
      <button @click="showForm = true">添加题目</button>
    </div>
    
    <div class="filter">
      <input 
        type="text" 
        v-model="searchQuery"
        placeholder="搜索题目..."
      >
      <select v-model="filterDifficulty">
        <option value="">所有难度</option>
        <option value="easy">简单</option>
        <option value="medium">中等</option>
        <option value="hard">困难</option>
      </select>
    </div>
    
    <div v-if="showForm" class="form-container">
      <QuestionForm 
        @close="showForm = false"
      />
    </div>
    
    <div class="list">
      <div 
        v-for="question in filteredQuestions" 
        :key="question.id" 
        class="question-item"
      >
        <div class="content" @click="viewQuestion(question.id)">
          <h3>{{ question.content.substring(0, 50) }}{{ question.content.length > 50 ? '...' : '' }}</h3>
          <div class="meta">
            <span class="difficulty" :class="question.difficulty">
              {{ 
                question.difficulty === 'easy' ? '简单' : 
                question.difficulty === 'medium' ? '中等' : '困难' 
              }}
            </span>
            <span class="tags">
              <span v-for="(tag, index) in question.tags" :key="index" class="tag">
                {{ tag }}
              </span>
            </span>
          </div>
        </div>
        <div class="actions">
          <button @click.stop="editQuestion(question)">编辑</button>
          <button @click.stop="deleteQuestion(question.id)">删除</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useQuestionStore } from '@/stores/question'
import QuestionForm from './QuestionForm.vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const questionStore = useQuestionStore()
const showForm = ref(false)
const searchQuery = ref('')
const filterDifficulty = ref('')

const filteredQuestions = computed(() => {
  return questionStore.questions.filter(question => {
    const matchesSearch = question.content.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
                         question.answer.toLowerCase().includes(searchQuery.value.toLowerCase())
    const matchesDifficulty = filterDifficulty.value ? question.difficulty === filterDifficulty.value : true
    return matchesSearch && matchesDifficulty
  })
})

const viewQuestion = (id: string) => {
  router.push(`/question/${id}`)
}

const editQuestion = (question: any) => {
  // 这里需要实现编辑逻辑
  showForm.value = true
}

const deleteQuestion = (id: string) => {
  if (confirm('确定要删除这个题目吗？')) {
    questionStore.removeQuestion(id)
  }
}
</script>

<style scoped>
.question-list {
  max-width: 1000px;
  margin: 0 auto;
  padding: 20px;
}

.filter {
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
}

.filter input {
  flex: 1;
  padding: 8px;
}

.list {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.question-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px;
  border: 1px solid #ddd;
  border-radius: 5px;
  cursor: pointer;
}

.question-item:hover {
  background-color: #f5f5f5;
}

.content {
  flex: 1;
}

.meta {
  display: flex;
  gap: 10px;
  margin-top: 5px;
  font-size: 0.9em;
  color: #666;
}

.difficulty {
  padding: 2px 8px;
  border-radius: 10px;
  font-size: 0.8em;
}

.difficulty.easy {
  background-color: #e6f7e6;
  color: #2e7d32;
}

.difficulty.medium {
  background-color: #fff8e1;
  color: #ff8f00;
}

.difficulty.hard {
  background-color: #ffebee;
  color: #c62828;
}

.tags {
  display: flex;
  gap: 5px;
}

.tag {
  background: #eee;
  padding: 2px 8px;
  border-radius: 10px;
  font-size: 0.8em;
}

.actions {
  display: flex;
  gap: 5px;
}

.form-container {
  margin-bottom: 20px;
}
</style>