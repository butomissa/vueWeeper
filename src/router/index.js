import Vue from 'vue'
import VueRouter from 'vue-router'
import VueWeeper from '@/views/VueWeeper.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'VueWeeper',
    component: VueWeeper
  },
]

const router = new VueRouter({
  mode: 'history',
  routes
})

export default router
