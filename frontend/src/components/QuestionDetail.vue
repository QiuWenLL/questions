<template>
  <div class="question-detail" v-if="question">
    <div class="header">
      <button @click="goBack">← 返回列表</button>
      <button @click="editQuestion">编辑</button>
    </div>
    
    <div class="content">
      <h2>题目内容</h2>
      <div class="section">{{ question.content }}</div>
      
      <h2>答案</h2>
      <div class="section">{{ question.answer }}</div>
      
      <h2>解析</h2>
      <div class="section">{{ question.explanation || '暂无解析' }}</div>
      
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
  </div>
  
  <div v-else class="not-found">
    <h2>题目不存在</h2>
    <button @click="goBack">返回列表</button>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useQuestionStore } from '@/stores/question'

const route = useRoute()
const router = useRouter()
const questionStore = useQuestionStore()

const question = computed(() => {
  return questionStore.getQuestionById(route.params.id as string)
})

const goBack = () => {
  router.push('/questions')
}

const editQuestion = () => {
  router.push(`/question/edit/${route.params.id}`)
}
</script>

<style scoped>
.question-detail {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

.header {
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
}

.section {
  margin-bottom: 30px;
  padding: 15px;
  background-color: #f9f9f9;
  border-radius: 5px;
  white-space: pre-wrap;
}

.meta {
  display: flex;
  gap: 15px;
  margin-top: 20px;
  padding-top: 20px;
  border-top: 1px solid #eee;
}

.difficulty {
  padding: 5px 10px;
  border-radius: 10px;
  font-size: 0.9em;
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
  gap: 8px;
}

.tag {
  background: #eee;
  padding: 3px 10px;
  border-radius: 10px;
  font-size: 0.9em;
}

.not-found {
  text-align: center;
  margin-top: 50px;
}
</style>