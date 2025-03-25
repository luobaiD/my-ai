import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      children: [
        {
          path: '/',
          name: 'index',
          component: () => import('../components/home.vue'),
        },
        {
          path: '/a/:chat_id?',
          name: 'a',
          component: () => import('../components/dialogue.vue'),
        }
      ]
    },
  ],
})

router.beforeEach((to, from, next) => {
  // 检查是否是页面刷新（from.name 为 null）
  // @ts-ignore
  if (!from.name && to.href !== '/') {
    next({
      path: '/', // 替换为你想要跳转的页面名称
    }) // 替换为你想要跳转的路径
  } else {
    next()
  }
})

export default router
