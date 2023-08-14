import axios from "axios";
import Vue from "vue";
import Vuex from "vuex";
import { CarteCouleur } from "./type";

Vue.use(Vuex);
const debug = process.env.NODE_ENV === "development";

export default new Vuex.Store({
  state: {
    serverphp: debug ? "http://localhost/aide/php/" : "/php/",
    couleurs: [] as CarteCouleur[],
  },
  getters: {},
  mutations: {
    majCouleur(state, couleurs) {
      state.couleurs = couleurs.map((c: CarteCouleur) => {
        return new CarteCouleur(c);
      });
    },
  },
  actions: {
    chargerCouleur(context) {
      axios
        .post(context.state.serverphp + "global.php", {
          action: "INI_COULEUR",
        })
        .then((response) => {
          context.commit("majCouleur", response.data.couleurs);
        });
    },
  },
  modules: {},
});
