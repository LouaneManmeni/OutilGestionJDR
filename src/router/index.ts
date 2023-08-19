import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: "/",
    component: () => import("@/views/Jeu.vue"),
  },
];

const router = new VueRouter({
  routes,
});

/* router.beforeEach((to, from, next) => {
  if (to.path.startsWith("/Connexion")) {
    next();
  } else {
    let id = store.state.utilisateur.getId();
    if (id == null) id = -1;
    if (id > 0) {
      next();
    } else {
      next({
        path: "/Connexion",
        params: { nextUrl: to.fullPath },
      });
    }
  }
}); */

export default router;
