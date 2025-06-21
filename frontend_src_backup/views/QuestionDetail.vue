<template>
  <div class="question-detail">
    <div v-if="loading" class="loading">加载中...</div>
    <div v-else-if="question" class="content">
      <div class="header">
        <h2>题目详情</h2>
        <div class="actions">
          <router-link 
            :to="{ name: 'edit-question', params: { id: question.id } }"
            class="btn btn-edit"
          >
            编辑
          </router-link>
          <button @click="deleteQuestion" class="btn btn-delete">
            删除
          </button>
        </div>
      </div>

      <div class="question-content">
        <h3>题目内容</h3>
        <p>{{ question.content }}</p>
      </div>

      <div class="question-meta">
        <p><strong>分类:</strong> {{ question.category || '未分类' }}</p>
        <p><strong>难度:</strong> {{ difficultyText }}</p>
      </div>

      <div class="question-answer">
        <h3>参考答案</h3>
        <p>{{ question.answer }}</p>
      </div>

      <div v-if="question.analysis" class="question-analysis">
        <h3>题目解析</h3>
        <p>{{ question.analysis }}</p>
      </div>

      <router-link to="/questions" class="btn btn-back">
        返回题目列表
      </router-link>
    </div>
    <div v-else class="not-found">
      <h3>题目不存在</h3>
      <router-link to="/questions" class="btn btn-back">
        返回题目列表
      </router-link>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useQuestionStore } from '@/stores/question'

export default defineComponent({
  name: 'QuestionDetail',
  setup() {
    const route = useRoute()
    const router = useRouter()
    const questionStore = useQuestionStore()
    const loading = ref(true)

    const question = computed(() => questionStore.currentQuestion)
    const difficultyText = computed(() => {
      const map: Record<number, string> = {
        1: '简单',
        2: '中等',
        3: '困难'
      }
      return question.value?.difficulty ? map[question.value.difficulty] : '未设置'
    })

    onMounted(async () => {
      const id = Number(route.params.id)
      try {
        await questionStore.fetchQuestionById(id)
      } catch (error) {
        console.error('加载题目失败:', error)
      } finally {
        loading.value = false
      }
    })

    const deleteQuestion = async () => {
      if (!question.value) return
      
      if (confirm('确定要删除这个题目吗？')) {
        try {
          await questionStore.deleteQuestion(question.value.id)
          router.push('/questions')
        } catch (error) {
          console.error('删除题目失败:', error)
        }
      }
    }

    return {
      question,
      loading,
      difficultyText,
      deleteQuestion
    }
  }
})
</script>

<style scoped>
.question-detail {
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
}

.loading {
  text-align: center;
  padding: 2rem;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
}

.actions {
  display: flex;
  gap: 1rem;
}

.question-content,
.question-answer,
.question-analysis {
  margin-bottom: 2rem;
  padding: 1rem;
  background: #f9f9f9;
  border-radius: 4px;
}

.question-meta {
  display: flex;
  gap: 2rem;
  margin-bottom: 2rem;
  color: #666;
}

.btn {
  display: inline-block;
  padding: 0.5rem 1rem;
  color: white;
  text-decoration: none;
  border-radius: 4px;
  border: none;
  cursor: pointer;
}

.btn-edit {
  background-color: #647eff;
}

.btn-edit:hover {
  background-color: #4d6cf5;
}

.btn-delete {
  background-color: #ff4757;
}

.btn-delete:hover {
  background-color: #ff2f43;
}

.btn-back {
  background-color: #666;
  margin-top: 2rem;
}

.btn-back:hover {
  background-color: #555;
}

.not-found {
  text-align: center;
  padding: 2rem;
}
</style>