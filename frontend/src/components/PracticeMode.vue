<template>
  <div class="practice-container">
    <div class="mode-selector">
      <div class="paper-selector" v-if="!isPracticing">
        <label>选择试卷：</label>
        <select v-model="selectedPaper">
          <option value="">全部试卷</option>
          <option v-for="paper in availablePapers" :value="paper" :key="paper">
            {{ paper }}
          </option>
        </select>
      </div>
      
      <button @click="startRandomPractice" :disabled="isPracticing">随机刷题</button>
      <button @click="startSequentialPractice" :disabled="isPracticing">顺序刷题</button>
      <button @click="endPractice" v-if="isPracticing">结束刷题</button>
    </div>

    <div v-if="currentQuestion" class="question-container">
      <div class="question-header">
        <span class="progress">第 {{ currentIndex + 1 }} 题 / 共 {{ totalQuestions }} 题</span>
        <span class="difficulty" :class="currentQuestion.difficulty">
          {{ 
            currentQuestion.difficulty === 'easy' ? '简单' : 
            currentQuestion.difficulty === 'medium' ? '中等' : '困难' 
          }}
        </span>
      </div>

      <div class="question-content">
        <h3>题目：</h3>
        <p>{{ currentQuestion.content }}</p>
      </div>

      <div class="answer-section" v-if="showAnswer">
        <h3>答案：</h3>
        <p>{{ currentQuestion.answer }}</p>
        <h3>解析：</h3>
        <p>{{ currentQuestion.explanation || '暂无解析' }}</p>
      </div>

      <div class="controls">
        <button @click="showAnswer = true" v-if="!showAnswer">查看答案</button>
        <button @click="nextQuestion" v-if="showAnswer">下一题</button>
      </div>
    </div>

    <div v-if="practiceFinished" class="result-container">
      <h2>刷题完成！</h2>
      <p>本次共完成 {{ answeredCount }} 道题目</p>
      <button @click="restartPractice">重新开始</button>
      <button @click="endPractice">返回</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useQuestionStore } from '@/stores/question'

const questionStore = useQuestionStore()

const isPracticing = ref(false)
const practiceMode = ref<'random' | 'sequential'>('random')
const currentIndex = ref(0)
const showAnswer = ref(false)
const practiceFinished = ref(false)
const answeredCount = ref(0)
const selectedPaper = ref('')

// 获取所有试卷列表
const availablePapers = computed(() => {
  const papers = new Set<string>()
  questionStore.questions.forEach(q => {
    if (q.paper) papers.add(q.paper)
  })
  return Array.from(papers)
})

// 根据选择的试卷筛选题目
const filteredQuestions = computed(() => {
  if (!selectedPaper.value) return questionStore.questions
  return questionStore.questions.filter(q => q.paper === selectedPaper.value)
})

const totalQuestions = computed(() => filteredQuestions.value.length)
const currentQuestion = computed(() => 
  isPracticing.value && filteredQuestions.value[currentIndex.value]
)

const startRandomPractice = () => {
  practiceMode.value = 'random'
  startPractice()
}

const startSequentialPractice = () => {
  practiceMode.value = 'sequential'
  startPractice()
}

const startPractice = () => {
  if (filteredQuestions.value.length === 0) {
    alert('当前筛选条件下没有题目')
    return
  }
  
  isPracticing.value = true
  practiceFinished.value = false
  answeredCount.value = 0
  currentIndex.value = practiceMode.value === 'random' 
    ? Math.floor(Math.random() * filteredQuestions.value.length)
    : 0
  showAnswer.value = false
}

const nextQuestion = () => {
  answeredCount.value++
  showAnswer.value = false
  
  if (practiceMode.value === 'random') {
    currentIndex.value = Math.floor(Math.random() * filteredQuestions.value.length)
  } else {
    if (currentIndex.value < filteredQuestions.value.length - 1) {
      currentIndex.value++
    } else {
      practiceFinished.value = true
    }
  }
}

const endPractice = () => {
  isPracticing.value = false
  practiceFinished.value = false
}

const restartPractice = () => {
  startPractice()
}
</script>

<style scoped>
.practice-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

.mode-selector {
  margin-bottom: 30px;
  display: flex;
  gap: 15px;
}

.mode-selector button {
  padding: 10px 20px;
  background-color: #42b983;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.mode-selector button:disabled {
  background-color: #cccccc;
  cursor: not-allowed;
}

.question-header {
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
  padding-bottom: 10px;
  border-bottom: 1px solid #eee;
}

.question-content {
  margin-bottom: 30px;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 5px;
}

.answer-section {
  margin-top: 30px;
  padding: 20px;
  background-color: #f0f8ff;
  border-radius: 5px;
}

.controls {
  margin-top: 30px;
  display: flex;
  justify-content: center;
}

.controls button {
  padding: 10px 20px;
  margin: 0 10px;
  background-color: #42b983;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
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

.result-container {
  text-align: center;
  margin-top: 50px;
}

.result-container button {
  margin: 10px;
  padding: 10px 20px;
  background-color: #42b983;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
</style>