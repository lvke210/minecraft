/*
 * @Description:
 * @Author: owen
 * @Date: 2021-08-27 10:06:17
 * @LastEditTime: 2021-08-27 11:05:56
 */
import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    name: "Welcome",
    component: () => import("../views/index.vue"),
  },
  {
    path: "/navi",
    name: "index",
    redirect: "/navi/a1",
    component: () => import("../layout/index.vue"),
    children: [
      {
        path: "/navi/a1",
        name: "Hello1",
        component: () => import("../views/components/hello.vue"),
        meta: { title: "a1" },
      },
      {
        path: "/navi/a2",
        name: "Hello2",
        component: () => import("../views/components/hello.vue"),
        meta: { title: "a2" },
      },
      {
        path: "/navi/a3",
        name: "Hello3",
        component: () => import("../views/components/hello.vue"),
        meta: { title: "a3" },
      },
      {
        path: "/navi/a4",
        name: "Hello4",
        component: () => import("../views/components/hello.vue"),
        meta: { title: "a4" },
      },
    ],
  },
  // {
  //   path: "/a1",
  //   component: () => import("../views/components/hello.vue"),
  // },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
