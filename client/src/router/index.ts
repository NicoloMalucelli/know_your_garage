import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import LoginView from "@/views/LoginView.vue";
import RegisterView from "@/views/RegisterView.vue";
import MyCarsView from "@/views/MyCarsView.vue";
import PageNotFound from "@/views/PageNotFound.vue";
import ProfileView from "@/views/ProfileView.vue";
import ParkingLotsView from "@/views/ParkingLotsView.vue";
import HistoryView from "@/views/HistoryView.vue";
import MyPassView from "@/views/MyPassView.vue";

import AdminLoginView from "@/views/admin/AdminLoginView.vue";
import AdminHomeView from "@/views/admin/AdminHomeView.vue";
import AdminProfileView from "@/views/admin/AdminProfileView.vue";
import AdminManagePasses from "@/views/admin/AdminManagePasses.vue";
import AdminAnalytics from "@/views/admin/AdminAnalytics.vue";

const routes: Array<RouteRecordRaw> = [
  { path: '/', name: 'home', component: ParkingLotsView },
  { path: '/login', name: 'login', component: LoginView },
  { path: '/register', name: 'register', component: RegisterView },
  { path: '/mycars', name: 'my_cars', component: MyCarsView },
  { path: '/profile', name: 'profile', component: ProfileView },
  { path: '/history', name: 'history', component: HistoryView },
  { path: '/pass', name: 'my_pass', component: MyPassView },

  { path: '/admin/login', name: 'admin_login', component: AdminLoginView },
  { path: '/admin/', name: 'admin_home', component: AdminHomeView },
  { path: '/admin/profile', name: 'admin_profile', component: AdminProfileView },
  { path: '/admin/passes', name: 'admin_passes', component: AdminManagePasses },
  {path: '/admin/analytics', name: 'admin_analytics', component: AdminAnalytics},

  { path: '/:catchAll(.*)', name:'404', component: PageNotFound}
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
