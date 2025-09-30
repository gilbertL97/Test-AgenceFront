import HomePage from "@/pages/HomePage.vue";
import PerformanceComercial from "@/pages/PerformanceComercial.vue";
import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomePage,
    meta: { title: 'Inicio' }
  },
  {
    path: '/performance-comercial',
    name: 'PerformanceComercial',
    component: PerformanceComercial,
    meta: { title: 'Planeación Comercial' }
  }
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
});

export default router;
