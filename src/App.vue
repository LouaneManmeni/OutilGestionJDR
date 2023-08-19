<template>
  <v-app>
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<!-- <script lang="ts">
import Vue from "vue"
import { Utilisateur } from "./store/types"

export default Vue.extend({
  name: "App",
  data: () => ({
    unsubscribe: "" as any,
    nomPrenom: "",
  }),
  methods: {
    deconnecter() {
      this.$store.commit("majUtilisateur", new Utilisateur())
      this.$router.push("/Connexion")
      this.nomPrenom = ""
    },
  },
  created() {
    this.$store.dispatch("initialisation")
    this.unsubscribe = this.$store.subscribe((mutation) => {
      switch (mutation.type) {
        case "majUtilisateur":
          this.nomPrenom = this.$store.state.utilisateur.getPrenomNom()
      }
    })
  },
  beforeDestroy() {
    this.unsubscribe = ""
  },
})
</script> -->
