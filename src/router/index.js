import { createRouter, createWebHistory } from 'vue-router'
// import {  } from 'firebase/auth';
import {useAuth, useChat} from "@/firebase";


import HomeView from '../views/HomeView.vue'
const auth = useAuth();

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/login',
      name: 'login',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/login.vue')
    },
    {
      path: '/conference-call',
      name: 'conference',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/ChatRoom.vue')
    },
    {
      path: '/discussionroom',
      name: 'chatRoom',
      beforeEnter: (to, from, next) => {
        // Check authentication conditions here
        const user = auth.user;
        if (user.value !== null) {
          // User is authenticated and email is verified, allow access
          next();
        } else {
          // Redirect to another route (e.g., login)
          next({ name: 'login' });
        }
      },
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/ChatHome.vue'),
      meta: { requiresAuth: true }
    }
  ]
})

export default router
