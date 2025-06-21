<template>
  <div class="question-form">
    <h2>{{ editing ? '编辑题目' : '添加题目' }}</h2>
    <form @submit.prevent="submitForm">
      <div class="form-group">
        <label>题目类型</label>
        <select v-model="formData.type" class="type-select">
          <option value="text">文本题</option>
          <option value="choice">选择题</option>
          <option value="judge">判断题</option>
        </select>
      </div>

      <div class="form-group">
        <label>题目内容</label>
        <textarea v-model="formData.content" required></textarea>
      </div>
      
      <div class="form-group">
        <label>答案</label>
        <div v-if="formData.type === 'choice'" class="answer-options">
          <label v-for="(opt, index) in ['A', 'B', 'C', 'D']" :key="index">
            <input 
              type="radio" 
              v-model="formData.answer" 
              :value="opt"
            > {{ opt }}
          </label>
        </div>
        <div v-else-if="formData.type === 'judge'" class="answer-options">
          <label>
            <input 
              type="radio" 
              v-model="formData.answer" 
              value="正确"
            > 正确
          </label>
          <label>
            <input 
              type="radio" 
              v-model="formData.answer" 
              value="错误"
            > 错误
          </label>
        </div>
        <textarea v-else v-model="formData.answer" required></textarea>
      </div>
      
      <div class="form-group">
        <label>解析</label>
        <textarea v-model="formData.explanation"></textarea>
      </div>
      
      <div class="form-group">
        <label>难度</label>
        <select v-model="formData.difficulty">
          <option value="easy">简单</option>
          <option value="medium">中等</option>
          <option value="hard">困难</option>
        </select>
      </div>
      
      <div class="form-group">
        <label>所属试卷</label>
        <select v-model="formData.paper" class="paper-select">
          <option value="">-- 选择试卷 --</option>
          <option v-for="paper in availablePapers" :value="paper" :key="paper">
            {{ paper }}
          </option>
        </select>
        <input 
          v-if="formData.paper === '' || !availablePapers.includes(formData.paper)"
          type="text" 
          v-model="formData.paper"
          placeholder="输入新试卷名称"
          class="paper-input"
        >
      </div>

      <div class="form-group">
        <label>标签</label>
        <input 
          type="text" 
          v-model="tagInput"
          @keydown.enter.prevent="addTag"
          placeholder="输入标签后按回车添加"
        >
        <div class="tags">
          <span v-for="(tag, index) in formData.tags" :key="index" class="tag">
            {{ tag }}
            <button @click="removeTag(index)">×</button>
          </span>
        </div>
      </div>
      
      <button type="submit">提交</button>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useQuestionStore } from '@/stores/question'

const questionStore = useQuestionStore()
const editing = ref(false)
const tagInput = ref('')

// 获取已有试卷列表
const availablePapers = computed(() => {
  const papers = new Set<string>()
  questionStore.questions.forEach(q => {
    if (q.paper) papers.add(q.paper)
  })
  return Array.from(papers)
})

const formData = ref({
  id: '',
  type: 'text',
  content: '',
  answer: '',
  explanation: '',
  difficulty: 'medium',
  paper: '',
  tags: [] as string[]
})

const addTag = () => {
  if (tagInput.value.trim() && !formData.value.tags.includes(tagInput.value.trim())) {
    formData.value.tags.push(tagInput.value.trim())
    tagInput.value = ''
  }
}

const removeTag = (index: number) => {
  formData.value.tags.splice(index, 1)
}

const submitForm = () => {
  if (editing.value) {
    questionStore.updateQuestion(formData.value)
  } else {
    questionStore.addQuestion(formData.value)
  }
  resetForm()
}

const resetForm = () => {
  formData.value = {
    id: '',
    content: '',
    answer: '',
    explanation: '',
    difficulty: 'medium',
    tags: []
  }
  editing.value = false
}
</script>

<style scoped>
.question-form {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

.form-group {
  margin-bottom: 15px;
}

textarea {
  width: 100%;
  min-height: 100px;
  padding: 8px;
}

.tags {
  display: flex;
  flex-wrap: wrap;
  gap: 5px;
  margin-top: 5px;
}

.tag {
  background: #eee;
  padding: 3px 8px;
  border-radius: 10px;
  display: flex;
  align-items: center;
}

.paper-select {
  width: 100%;
  padding: 8px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.paper-input {
  width: 100%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  margin-top: 5px;
}

.type-select {
  width: 100%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  margin-bottom: 15px;
}

.answer-options {
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
  margin-bottom: 10px;
}

.answer-options label {
  display: flex;
  align-items: center;
  gap: 5px;
  cursor: pointer;
}
</style>