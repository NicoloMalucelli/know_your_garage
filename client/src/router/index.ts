import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from "@/views/LoginView.vue";
import RegisterView from "@/views/RegisterView.vue";
import MyCarsView from "@/views/MyCarsView.vue";
import PageNotFound from "@/views/PageNotFound.vue";

const routes: Array<RouteRecordRaw> = [
  { path: '/', name: 'home', component: HomeView },
  { path: '/login', name: 'login', component: LoginView },
  { path: '/register', name: 'register', component: RegisterView },
  { path: '/mycars', name: 'my_cars', component: MyCarsView },
  { path: '/:catchAll(.*)', name:'404', component: PageNotFound}
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
