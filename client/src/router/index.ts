import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from "@/views/LoginView.vue";
import PageNotFound from "@/views/PageNotFound.vue";

const routes: Array<RouteRecordRaw> = [
  { path: '/', name: 'home', component: HomeView },
  { path: '/login', name: 'login', component: LoginView },
  { path: '/:catchAll(.*)', name:'404', component: PageNotFound}
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
