<template>
  <div>
    <v-card
      style="height: 50px"
      color="purple lighten-5"
      class="d-flex align-center justify-space-between"
    >
    </v-card>
    <div class="d-flex">
      <v-card
        v-for="(unJeu, j) in listeJeuDeRole"
        :key="j + 'JeuDeRole'"
        color="primary"
        min-width="10px"
        class="ma-2"
        @click="choixJDR(unJeu.id)"
      >
        <v-card-title>
          {{ unJeu.nom }}
        </v-card-title>
      </v-card>
    </div>
  </div>
</template>

<script lang="ts">
import axios from "axios";
import Vue from "vue";

export default Vue.extend({
  name: "Jeu",
  data() {
    return {
      listeJeuDeRole: [] as any[],
      snak_visible: false,
      snakbar_text: "",
    };
  },
  methods: {
    initialisation() {
      axios
        .post(this.$store.state.serverphp + "jeuDeRole.php", {
          action: "INITIALISATION",
          idUtilisateur: 1,
        })
        .then((response) => {
          this.listeJeuDeRole = response.data.jeuDeRole;
        });
    },
    choixJDR(idJDR: string) {
      this.$store.commit("majIdJDR", idJDR);
      this.$router.push("/Jeu");
    },
    snackbarVisible(text: string) {
      this.snakbar_text = text;
      this.snak_visible = true;
    },
    delay(n: number) {
      return new Promise(function (resolve) {
        setTimeout(resolve, n * 100);
      });
    },
  },
  created() {},
  mounted() {
    this.initialisation();
  },
});
</script>
