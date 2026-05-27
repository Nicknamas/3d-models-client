import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'App',
      children: [
        {
          path: '/login',
          name: 'Login',
          component: () => import('@/pages/Login.vue'),
        },
        {
          path: '',
          name: 'Root',
          component: () => import('@/pages/Root.vue'),
          children: [
            {
              path: '/home',
              name: 'Home',
              component: () => import('@/pages/Home.vue')
            },
            {
              path: '/profile',
              name: 'Profile',
              component: () => import('@/pages/Profile.vue')
            }
          ]
        }
      ]
    }
  ],
})

export default router
