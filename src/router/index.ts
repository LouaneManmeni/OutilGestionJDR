import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import store from "../store";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: "/Jeu",
    component: () => import("@/views/Jeu.vue"),
  },
  {
    path: "/",
    component: () => import("@/views/JeuDeRole.vue"),
  },
  {
    path: "/Connexion",
    component: () => import("@/views/Connexion.vue"),
  },
];

const router = new VueRouter({
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.path.startsWith("/Connexion")) {
    next();
  } else {
    let id = store.state.utilisateur.getId();
    if (id == null) id = -1;
    if (id > -1) {
      next();
    } else {
      next({
        path: "/Connexion",
        params: { nextUrl: to.fullPath },
      });
    }
  }
});

export default router;
