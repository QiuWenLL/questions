<template>
  <div class="home">
    <h1>欢迎使用刷题系统</h1>
    <p>这是一个帮助你高效学习和练习题目的平台</p>
    <router-link to="/questions" class="btn btn-primary">
      开始刷题
    </router-link>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'HomeView',
})
</script>

<style scoped>
.home {
  text-align: center;
  padding: 2rem;
}

.btn {
  display: inline-block;
  padding: 0.5rem 1rem;
  background-color: #42b983;
  color: white;
  text-decoration: none;
  border-radius: 4px;
  margin-top: 1rem;
}

.btn:hover {
  background-color: #3aa876;
}
</style>