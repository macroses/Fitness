import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/Home.vue'
import Login from '@/views/Login.vue'
import Docs from '@/views/Docs.vue'
import Register from '@/views/Register.vue'
import { supabase } from '@/lib/supabaseClient'
import Account from '@/views/Account.vue'
import WorkoutMode from '@/views/WorkoutMode.vue'

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
      path: '/docs',
      name: 'Docs',
      component: Docs,
      meta: {
        auth: true
      }
    },
    {
      path: '/account',
      name: 'Account',
      component: Account,
      meta: {
        auth: true
      }
    },
    {
      path: '/workout/:workoutId',
      name: 'workoutmode',
      component: WorkoutMode,
      meta: {
        auth: true
      }
    }
  ]
})

router.beforeEach(async (to, from, next) => {
  // TODO: продумать редирект на изменении состояния авторизации, когда юзер разлогинивается
  const {
    data: { session }
  } = await supabase.auth.getSession()

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
