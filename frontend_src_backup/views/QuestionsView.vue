<template>
  <div class="questions-view">
    <div class="header">
      <h1>题目列表</h1>
      <router-link to="/questions/create" class="btn btn-primary">
        添加新题目
      </router-link>
    </div>
    
    <div class="search-box">
      <input 
        v-model="searchQuery"
        type="text"
        placeholder="搜索题目..."
        class="search-input"
      >
    </div>

    <div class="question-list">
      <div 
        v-for="question in filteredQuestions" 
        :key="question.id"
        class="question-card"
      >
        <h3>{{ question.content.substring(0, 50) }}...</h3>
        <p>分类: {{ question.category || '未分类' }}</p>
        <p>难度: {{ difficultyMap[question.difficulty] || '未设置' }}</p>
        <router-link 
          :to="{ name: 'question-detail', params: { id: question.id } }"
          class="btn btn-detail"
        >
          查看详情
        </router-link>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, ref, onMounted } from 'vue'
import { useQuestionStore } from '@/stores/question'
import type { Question } from '@/types/question'

export default defineComponent({
  name: 'QuestionsView',
  setup() {
    const questionStore = useQuestionStore()
    const searchQuery = ref('')
    const difficultyMap: Record<number, string> = {
      1: '简单',
      2: '中等',
      3: '困难'
    }

    const filteredQuestions = computed(() => {
      if (!searchQuery.value) return questionStore.questions
      return questionStore.questions.filter(q => 
        q.content.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
        (q.category && q.category.toLowerCase().includes(searchQuery.value.toLowerCase()))
      )
    })

    onMounted(async () => {
      await questionStore.fetchQuestions()
    })

    return {
      searchQuery,
      filteredQuestions,
      difficultyMap
    }
  }
})
</script>

<style scoped>
.questions-view {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
}

.search-box {
  margin-bottom: 1.5rem;
}

.search-input {
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.question-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
}

.question-card {
  padding: 1.5rem;
  border: 1px solid #eee;
  border-radius: 8px;
  transition: all 0.3s ease;
}

.question-card:hover {
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transform: translateY(-2px);
}

.btn {
  display: inline-block;
  padding: 0.5rem 1rem;
  color: white;
  text-decoration: none;
  border-radius: 4px;
  margin-top: 0.5rem;
}

.btn-primary {
  background-color: #42b983;
}

.btn-primary:hover {
  background-color: #3aa876;
}

.btn-detail {
  background-color: #647eff;
}

.btn-detail:hover {
  background-color: #4d6cf5;
}
</style>