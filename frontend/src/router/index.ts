import { createRouter, createWebHistory } from "vue-router";
import QuestionList from "@/components/QuestionList.vue";
import QuestionDetail from "@/components/QuestionDetail.vue";
import QuestionForm from "@/components/QuestionForm.vue";
import PracticeMode from "@/components/PracticeMode.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      redirect: "/questions",
    },
    {
      path: "/questions",
      name: "questions",
      component: QuestionList,
    },
    {
      path: "/question/:id",
      name: "question",
      component: QuestionDetail,
      props: true,
    },
    {
      path: "/question/edit/:id",
      name: "edit-question",
      component: QuestionForm,
      props: true,
    },
    {
      path: "/question/add",
      name: "add-question",
      component: QuestionForm,
    },
    {
      path: "/practice",
      name: "practice",
      component: PracticeMode,
    },
  ],
});

export default router;