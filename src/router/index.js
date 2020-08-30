import Vue from 'vue'
import VueRouter from 'vue-router'
import Guide from '../views/Guide.vue'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'Guide',
    component: Guide
  },
  {
    path: '/workspace',
    name: 'Workspace',
    component: () => import(/* webpackChunkName: "workspace" */ '../views/Workspace.vue')
  },
  {
    path: '/preview',
    name: 'Preview',
    component: () => import(/* webpackChunkName: "preview" */ '../views/Preview.vue')
  },
  {
    path: '/admin',
    name: 'Admin',
    component: () => import(/* webpackChunkName: "admin" */ '../views/Admin.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
