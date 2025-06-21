<template>
  <div id="app">
    <header>
      <h1>面试问题练习平台</h1>
      <nav>
        <router-link to="/questions">题目列表</router-link>
        <router-link to="/question/add">添加题目</router-link>
        <router-link to="/practice">刷题模式</router-link>
      </nav>
    </header>
    
    <main>
      <router-view />
    </main>
  </div>
</template>

<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 0;
  border-bottom: 1px solid #eee;
  margin-bottom: 30px;
}

nav {
  display: flex;
  gap: 20px;
}

nav a {
  color: #2c3e50;
  text-decoration: none;
  font-weight: bold;
  padding: 5px 10px;
  border-radius: 4px;
}

nav a.router-link-exact-active {
  color: #fff;
  background-color: #42b983;
}

main {
  min-height: calc(100vh - 200px);
}
</style>