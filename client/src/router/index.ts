import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import LoginView from "@/views/LoginView.vue";
import RegisterView from "@/views/RegisterView.vue";
import MyCarsView from "@/views/MyCarsView.vue";
import PageNotFound from "@/views/PageNotFound.vue";
import ProfileView from "@/views/ProfileView.vue";
import ParkingLotsView from "@/views/ParkingLotsView.vue";

import AdminLoginView from "@/views/admin/AdminLoginView.vue";
import AdminHomeView from "@/views/admin/AdminHomeView.vue";
import AdminProfileView from "@/views/admin/AdminProfileView.vue";

const routes: Array<RouteRecordRaw> = [
  { path: '/', name: 'home', component: ParkingLotsView },
  { path: '/login', name: 'login', component: LoginView },
  { path: '/register', name: 'register', component: RegisterView },
  { path: '/mycars', name: 'my_cars', component: MyCarsView },
  { path: '/profile', name: 'profile', component: ProfileView },

  { path: '/admin/login', name: 'admin_login', component: AdminLoginView },
  { path: '/admin/', name: 'admin_home', component: AdminHomeView },
  { path: '/admin/profile', name: 'admin_profile', component: AdminProfileView },

  { path: '/:catchAll(.*)', name:'404', component: PageNotFound}
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
