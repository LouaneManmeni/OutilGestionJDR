<template>
  <div>
    <div class="d-flex">
      <v-card
        v-for="(unJeu, j) in listeJeuDeRole"
        :key="j + 'JeuDeRole'"
        color="primary"
        min-width="10px"
        class="ma-2"
        @click="choixJDR(unJeu)"
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
    choixJDR(JDR: any) {
      this.$store.commit("majJDR", JDR);
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
