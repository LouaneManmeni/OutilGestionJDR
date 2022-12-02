<template>
  <v-app>
    <div>
      <v-row style="width: 50%" class="ma-2">
        <v-text-field v-model="nomJ" label="Nom" class="mx-2"></v-text-field>
        <v-text-field v-model="PVJ" label="PV" class="mx-2"></v-text-field>
        <v-text-field v-model="MPJ" label="MP" class="mx-2"></v-text-field>
        <v-btn @click="ajouterJoueur()" color="green" class="mt-3"><v-icon>mdi-plus</v-icon></v-btn>
      </v-row>
      <div v-for="(unJoueur, j) in joueur" :key="j + 'J'" style="width: 50%">
        <v-row class="ml-5">
          <div class="mx-2 d-flex align-center">{{ unJoueur.nom }}</div>
          <div class="mx-2 d-flex align-center">{{ unJoueur.PV }}</div>
          <div class="mx-2 d-flex align-center">{{ unJoueur.MP }}</div>
          <v-btn icon color="error" @click="supprimerJoueur(j)"
            ><v-icon>mdi-close</v-icon></v-btn
          >
        </v-row>
        <v-btn @click="ouvrirAjouterStatusJoueur(j)" class="ma-5" color="green"
          ><v-icon>mdi-plus</v-icon> Status</v-btn
        >
        <v-row
          v-for="(unStatus, s) in unJoueur.status"
          :key="s + 'S'"
          class="ml-5"
        >
          <div class="mx-2 d-flex align-center">{{ unStatus.nomStatus }}</div>
          <div class="mx-2 d-flex align-center">{{ unStatus.effetStatus }}</div>
          <div class="mx-2 d-flex align-center">
            {{ unStatus.descripStatus }}
          </div>
          <v-btn icon color="error" @click="supprimerStatus(j, s)"
            ><v-icon>mdi-close</v-icon></v-btn
          >
        </v-row>
        <div v-if="unJoueur.ajouterStatus == true" class="d-flex">
          <v-text-field
            class="mx-2"
            v-model="nomStatus"
            label="Nom status"
          ></v-text-field>
          <v-text-field
            class="mx-2"
            v-model="effetStatus"
            label="Effet"
          ></v-text-field>
          <v-text-field
            class="mx-2"
            v-model="descripStatus"
            label="Descriptif"
          ></v-text-field>
          <v-btn @click="ajouterStatus(j)" color="green" class="mt-5">Ajouter</v-btn>
        </div>
      </div>
    </div>
  </v-app>
</template>

<script>
export default {
  name: "App",

  data: () => ({
    joueur: [],
    nomJ: "",
    PVJ: "",
    MPJ: "",
    nomStatus: "",
    effetStatus: "",
    descripStatus: "",
    ennemy: [],
  }),
  methods: {
    ajouterJoueur() {
      this.joueur.push({
        nom: this.nomJ,
        PV: this.PVJ,
        MP: this.MPJ,
        ajouterStatus: false,
        status: [],
      });
      this.nomJ = "";
      this.PVJ = "";
      this.MPJ = "";
    },
    supprimerJoueur(index) {
      this.joueur.splice(index, 1);
    },
    supprimerStatus(indexJoueur, indexStatus) {
      this.joueur[indexJoueur].status.splice(indexStatus, 1);
    },
    ouvrirAjouterStatusJoueur(index) {
      this.joueur[index].ajouterStatus = true;
    },
    ajouterStatus(index) {
      let leJoueur = this.joueur[index];
      leJoueur.status.push({
        nomStatus: this.nomStatus,
        effetStatus: this.effetStatus,
        descripStatus: this.descripStatus,
      });
      this.effetStatus = "";
      this.nomStatus = "";
      this.descripStatus = "";
      leJoueur.ajouterStatus = false;
    },
  },
};
</script>
