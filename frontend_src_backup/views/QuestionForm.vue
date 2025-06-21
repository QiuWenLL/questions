<template>
  <div class="question-form">
    <h2>{{ isEditMode ? '编辑题目' : '创建新题目' }}</h2>
    
    <form @submit.prevent="submitForm">
      <div class="form-group">
        <label for="content">题目内容</label>
        <textarea
          id="content"
          v-model="form.content"
          required
          rows="5"
        ></textarea>
      </div>

      <div class="form-group">
        <label for="answer">参考答案</label>
        <textarea
          id="answer"
          v-model="form.answer"
          required
          rows="3"
        ></textarea>
      </div>

      <div class="form-group">
        <label for="analysis">题目解析</label>
        <textarea
          id="analysis"
          v-model="form.analysis"
          rows="3"
        ></textarea>
      </div>

      <div class="form-row">
        <div class="form-group">
          <label for="category">分类</label>
          <input
            id="category"
            v-model="form.category"
            type="text"
          >
        </div>

        <div class="form-group">
          <label for="difficulty">难度</label>
          <select
            id="difficulty"
            v-model="form.difficulty"
          >
            <option :value="undefined">请选择难度</option>
            <option value="1">简单</option>
            <option value="2">中等</option>
            <option value="3">困难</option>
          </select>
        </div>
      </div>

      <div class="form-actions">
        <button type="submit" class="btn btn-submit">
          {{ isEditMode ? '更新题目' : '创建题目' }}
        </button>
        <router-link to="/questions" class="btn btn-cancel">
          取消
        </router-link>
      </div>
    </form>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useQuestionStore } from '@/stores/question'

interface QuestionForm {
  content: string
  answer: string
  analysis?: string
  category?: string
  difficulty?: number
}

export default defineComponent({
  name: 'QuestionForm',
  setup() {
    const route = useRoute()
    const router = useRouter()
    const questionStore = useQuestionStore()

    const isEditMode = computed(() => route.name === 'edit-question')
    const form = reactive<QuestionForm>({
      content: '',
      answer: '',
      analysis: '',
      category: '',
      difficulty: undefined
    })

    onMounted(async () => {
      if (isEditMode.value) {
        const id = Number(route.params.id)
        await questionStore.fetchQuestionById(id)
        if (questionStore.currentQuestion) {
          Object.assign(form, questionStore.currentQuestion)
        }
      }
    })

    const submitForm = async () => {
      try {
        if (isEditMode.value) {
          await questionStore.updateQuestion({
            id: Number(route.params.id),
            ...form
          })
        } else {
          await questionStore.createQuestion(form)
        }
        router.push('/questions')
      } catch (error) {
        console.error('保存题目失败:', error)
      }
    }

    return {
      form,
      isEditMode,
      submitForm
    }
  }
})
</script>

<style scoped>
.question-form {
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
}

h2 {
  margin-bottom: 2rem;
}

.form-group {
  margin-bottom: 1.5rem;
}

.form-row {
  display: flex;
  gap: 2rem;
}

.form-row .form-group {
  flex: 1;
}

label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: bold;
}

input,
textarea,
select {
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-family: inherit;
}

textarea {
  min-height: 100px;
}

.form-actions {
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  margin-top: 2rem;
}

.btn {
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  text-decoration: none;
}

.btn-submit {
  background-color: #42b983;
  color: white;
}

.btn-submit:hover {
  background-color: #3aa876;
}

.btn-cancel {
  background-color: #f0f0f0;
  color: #333;
}

.btn-cancel:hover {
  background-color: #e0e0e0;
}
</style>