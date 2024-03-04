import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/Home.vue'
import Login from '@/views/Login.vue'
import Register from '@/views/Register.vue'
import { supabase } from '@/lib/supabaseClient'
import Exercises from '@/views/Exercises.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
      meta: {
        auth: true
      }
    },
    {
      path: '/login',
      name: 'Login',
      component: Login,
      meta: {
        auth: false
      }
    },
    {
      path: '/register',
      name: 'Register',
      component: Register,
      meta: {
        auth: false
      }
    },
    {
      path: '/workout/',
      name: 'workoutmode',
      component: () => import('@/views/WorkoutMode.vue'),
      meta: {
        auth: true
      }
    },
    {
      path: '/settings',
      name: 'settings',
      component: () => import('@/views/AccountSettings.vue'),
      meta: {
        auth: true
      }
    },
    {
      path: '/body-parameters',
      name: 'bodyParameters',
      component: () => import('@/views/BodyParameters.vue'),
      meta: {
        auth: true
      }
    },
    {
      path: '/program',
      name: 'program',
      component: () => import('@/views/Program.vue'),
      meta: {
        auth: true
      }
    },
    {
      path: '/exercises',
      name: 'exercises',
      component: Exercises,
      meta: {
        auth: true
      }
    },
    {
      name: '404',
      path: '/:pathMatch(.*)*',
      component: () => import('@/views/404.vue')
    }
  ]
})

router.beforeEach(async (to, from, next) => {
  const { data: { session } } = await supabase.auth.getSession()

  if (to.matched.some(res => res.meta.auth)) {
    if (session?.user) {
      next()
      return
    }

    next({ name: 'Login' })
    return
  }

  next()
})

export default router
