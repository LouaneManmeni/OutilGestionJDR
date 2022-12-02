import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';

Vue.use(Vuetify);

export default new Vuetify({
    theme: {
        themes: {
          light: {
            primary: '#D1C4E9',
            secondary: '#E1BEE7',
            accent: '#8c9eff',
            error: '#b71c1c',
          },
        },
      },
});
