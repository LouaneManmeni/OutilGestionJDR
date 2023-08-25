import axios from "axios";
import Vue from "vue";
import Vuex from "vuex";
import { CarteCouleur, Utilisateur } from "./type";

Vue.use(Vuex);
const debug = process.env.NODE_ENV === "development";

export default new Vuex.Store({
  state: {
    serverphp: debug ? "http://localhost/aide/php/" : "/php/",
    couleurs: [] as CarteCouleur[],
    utilisateur: new Utilisateur(),
    idJDR: "",
  },
  getters: {},
  mutations: {
    majCouleur(state, couleurs: CarteCouleur[]) {
      state.couleurs = couleurs.map((c: CarteCouleur) => {
        return new CarteCouleur(c);
      });
    },
    majUtilisateur(state, unUtilisateur: Utilisateur) {
      state.utilisateur = new Utilisateur(unUtilisateur);
    },
    majIdJDR(state, id: string) {
      state.idJDR = id;
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
