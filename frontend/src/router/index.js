import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';
import adminlogin from '../components/admin/adminlogin.vue';
import dashboard from '../components/admin/dashboardG.vue';
import createSurvey from '../components/admin/createsurvey.vue';
import editSurvey from '../components/admin/editSurvey.vue';
const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ '../views/About.vue'),
  },
  {
    path: '/admin/login',
    name: 'dashboard',
    component: adminlogin,
  },
  {
    path: '/admin/dashboard',
    name: 'Adashboard',
    component: dashboard,
  },
  {
    path: '/admin/createSurvey',
    name: 'createSurvey',
    component: createSurvey,
  },
  {
    path: '/admin/editSurvey',
    name: 'editSurvey',
    component: editSurvey,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
