<template>
  <v-app>
    <v-app-bar app clipped-left dense flat color="secondary">
      <div class="d-flex align-center">
        <v-app-bar-nav-icon @click.stop="drawer = !drawer" v-if="id != -1" />
        <div class="ml-1">JDR</div>
      </div>
    </v-app-bar>
    <v-navigation-drawer
      v-model="drawer"
      app
      clipped
      dark
      width="200"
      v-if="id != -1"
    >
      <!--       <v-list>
        <v-list-item to="/Poche" @click="envoyerALaBD()" v-if="AutPoche()">
          <v-list-item-title><v-icon color="orange">mdi-tray</v-icon> Poche </v-list-item-title>
        </v-list-item>
      </v-list> -->
      <template v-slot:append>
        <v-list-item @click="deconnecter()">
          <v-list-item-title
            ><v-icon color="red">mdi-power</v-icon> Déconnexion
          </v-list-item-title>
        </v-list-item>
      </template>
    </v-navigation-drawer>

    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script lang="ts">
import Vue from "vue";
import { dbjdr } from "./plugins/variables";
import store from "./store";

export default Vue.extend({
  name: "App",
  data: () => ({
    unsubscribe: "" as any,
    drawer: false,
    id: store.state.utilisateur.getId(),
  }),
  methods: {
    async deconnecter() {
      this.$store.commit("majUtilisateur", { id: -1, nom: "" });
      const db = await dbjdr();
      const store = db.transaction("co", "readwrite").store;
      await store.clear();
      db.close();
      this.$router.push("/Connexion");
    },
  },
  async created() {
    const db = await dbjdr();
    const laCo = await db.getAll("co");
    db.close();
    if (laCo.length > 0) {
      this.$store.commit("majUtilisateur", laCo[0]);
      this.$router.push("/");
      this.drawer = true;
    }
    this.unsubscribe = this.$store.subscribe((mutation) => {
      switch (mutation.type) {
        case "majUtilisateur":
          this.id = this.$store.state.utilisateur.getId();
      }
    });
  },
  beforeDestroy() {
    this.unsubscribe = "";
  },
});
</script>
