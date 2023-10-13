import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/editor",
    name: "editor",
    component: () => import("@/views/Editor/index.vue"),
  },
  {
    path: "/",
    name: "media",
    component: () => import("@/views/Media/index.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
