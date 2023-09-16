<template>
  <div>
    <v-row class="mt-5">
      <v-col>
        <v-img
          :src="require('../assets/logo.png')"
          height="140"
          contain
        ></v-img> </v-col
    ></v-row>
    <v-row align="start" justify="center">
      <v-col cols="12" sm="6" md="2" class="text-center">
        <h2 class="mt-n5">Outil JDR</h2>
        <v-form autocomplete="off" class="mt-7">
          <v-text-field
            label="Utilisateur"
            placeholder="username"
            outlined
            autocomplete="username"
            prepend-icon="mdi-account"
            v-model="identifiant"
            autofocus
            ref="utilisateur"
          >
          </v-text-field>
          <v-text-field
            outlined
            label="Mot de passe"
            placeholder="password"
            prepend-icon="mdi-lock"
            autocomplete="current-password"
            type="password"
            v-model="motdepasse"
          ></v-text-field>
          <v-btn color="primary" depressed @click="connexion()">
            Se connecter
          </v-btn>
        </v-form>
      </v-col>
    </v-row>
  </div>
</template>

<script lang="ts">
import { dbjdr } from "@/plugins/variables";
import axios from "axios";
import Vue from "vue";

export default Vue.extend({
  name: "Jeu",
  data() {
    return {
      identifiant: "",
      motdepasse: "",
      snak_visible: false,
      snakbar_text: "",
    };
  },
  methods: {
    connexion() {
      axios
        .post(this.$store.state.serverphp + "connexion.php", {
          action: "CONNEXION",
          identifiant: this.identifiant,
          motdepasse: this.motdepasse,
        })
        .then(async (response) => {
          if (response.data.authentification == "oui") {
            this.$store.commit("majUtilisateur", response.data.utilisateur);
            const db = await dbjdr();
            const store = db.transaction("co", "readwrite").store;
            await store.put(response.data.utilisateur);
            db.close();
            this.$router.push("/");
          } else {
            this.snackbarVisible("Identifiant ou mot de passe incorect");
          }
        });
    },
    snackbarVisible(text: string) {
      this.snakbar_text = text;
      this.snak_visible = true;
    },
  },
});
</script>
