<template>
  <div class="not-found">
    <div class="error-code">404</div>
    <h1 class="error-title">页面未找到</h1>
    <p class="error-message">
      您访问的页面不存在或已被移除
    </p>
    <router-link to="/" class="btn btn-home">
      返回首页
    </router-link>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'NotFound'
})
</script>

<style scoped>
.not-found {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 60vh;
  text-align: center;
  padding: 2rem;
}

.error-code {
  font-size: 6rem;
  font-weight: bold;
  color: var(--primary-color);
  line-height: 1;
  margin-bottom: 1rem;
}

.error-title {
  font-size: 2rem;
  margin-bottom: 1rem;
  color: var(--text-color);
}

.error-message {
  font-size: 1.1rem;
  color: var(--text-light);
  margin-bottom: 2rem;
  max-width: 500px;
}

.btn-home {
  padding: 0.75rem 1.5rem;
  font-size: 1rem;
  background-color: var(--primary-color);
  color: white;
  border-radius: var(--border-radius);
  text-decoration: none;
  transition: background-color 0.2s;
}

.btn-home:hover {
  background-color: var(--primary-hover);
}
</style>