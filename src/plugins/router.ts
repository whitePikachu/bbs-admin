import { App } from "vue";
import { createRouter, createWebHistory } from "vue-router";
import { token } from "./pinia";
const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      component: () => import("@/layouts/home.vue"),
      beforeEnter: (to, from, next) => {
        if (token().token) {
          next();
        } else {
          next("/login");
        }
      },
      redirect: "/home",
      children: [
        {
          path: "/home",
          component: () => import("@/layouts/index.vue"),
        },
        {
          path: "/user",
          component: () => import("@/layouts/user.vue"),
        },
        {
          path: "/comments",
          component: () => import("@/layouts/comments.vue"),
        },
        {
          path: "/plate",
          component: () => import("@/layouts/plate.vue"),
        },
        {
          path: "/post",
          component: () => import("@/layouts/post.vue"),
        },
      ],
    },
    {
      path: "/login",
      component: () => import("@/layouts/login.vue"),
      beforeEnter: (to, from, next) => {
        if (!token().token) {
          next();
        } else {
          next("/home");
        }
      },
    },
  ],
});
export function setupRouter(app: App<Element>) {
  app.use(router);
}
export default router;
