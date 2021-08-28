/*
 * @Description:
 * @Author: owen
 * @Date: 2021-08-27 10:06:17
 * @LastEditTime: 2021-08-28 16:59:03
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
    redirect: "/navi/dance",
    component: () => import("../layout/index.vue"),
    children: [
      {
        path: "/navi/bolls",
        name: "bolls",
        component: () => import("../views/components/hello.vue"),
        meta: { title: "bolls" },
      },
      {
        path: "/navi/ground",
        name: "ground",
        component: () => import("../views/components/ground.vue"),
        meta: { title: "ground" },
      },
      {
        path: "/navi/lake",
        name: "Lake",
        component: () => import("../views/components/lake.vue"),
        meta: { title: "lake" },
      },
      {
        path: "/navi/vision",
        name: "Vision",
        component: () => import("../views/components/vision.vue"),
        meta: { title: "vision" },
      },
      {
        path: "/navi/drive",
        name: "Drive",
        component: () => import("../views/components/drive.vue"),
        meta: { title: "drive" },
      },
      {
        path: "/navi/dance",
        name: "Dance",
        component: () => import("../views/components/dance.vue"),
        meta: { title: "dance" },
      },
      {
        path: "/navi/dance2",
        name: "Dance2",
        component: () => import("../views/components/dance2.vue"),
        meta: { title: "dance2" },
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
