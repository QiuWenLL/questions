import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import { useQuestionStore } from '@/stores/question'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      meta: { title: '首页' }
    },
    {
      path: '/questions',
      name: 'questions',
      component: () => import('../views/QuestionsView.vue'),
      meta: { title: '题目列表' }
    },
    {
      path: '/questions/:id',
      name: 'question-detail',
      component: () => import('../views/QuestionDetail.vue'),
      meta: { title: '题目详情' },
      props: true
    },
    {
      path: '/questions/create',
      name: 'create-question',
      component: () => import('../views/QuestionForm.vue'),
      meta: { title: '创建题目', requiresAuth: true }
    },
    {
      path: '/questions/:id/edit',
      name: 'edit-question',
      component: () => import('../views/QuestionForm.vue'),
      meta: { title: '编辑题目', requiresAuth: true }
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'not-found',
      component: () => import('../views/NotFound.vue'),
      meta: { title: '页面不存在' }
    }
  ]
})

router.beforeEach((to, from, next) => {
  // 设置页面标题
  document.title = to.meta.title 
    ? `${to.meta.title} - 刷题系统` 
    : '刷题系统'

  // 检查需要认证的路由
  if (to.meta.requiresAuth) {
    const questionStore = useQuestionStore()
    // 这里可以添加实际的认证检查逻辑
    // if (!questionStore.isAuthenticated) {
    //   next({ name: 'login' })
    //   return
    // }
  }

  next()
})

export default router