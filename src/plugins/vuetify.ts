import Vue from "vue";
import Vuetify from "vuetify/lib";

import colors from "vuetify/lib/util/colors";

Vue.use(Vuetify);

export default new Vuetify({
  theme: {
    themes: {
      light: {
        primary: "#7E57C2",
        secondary: "#EDE7F6",
        accent: colors.indigo.base,
      },
    },
  },
});
