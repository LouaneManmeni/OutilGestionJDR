<template>
  <v-app>
    <v-card
      color="primary"
      height="50px"
      class="text-h4 d-flex align-center justify-space-around"
    >
      <v-btn icon color="black" @click="caseAjouterJoueur = true">
        <v-icon>mdi-account-plus</v-icon>
      </v-btn>
      <div class="mt-1 d-flex">
        <div>N° tour: {{ NTour }}</div>
        <v-btn icon color="black" @click="ajouterTour()">
          <v-icon>mdi-plus</v-icon>
        </v-btn>
        <v-btn icon color="black" @click="renitialiserTour()"
          ><v-icon>mdi-refresh</v-icon></v-btn
        >
      </div>
      <v-btn icon color="black" @click="caseAjouterEnnemi = true"
        ><v-icon>mdi-target-account</v-icon></v-btn
      >
    </v-card>
    <div>
      <v-row style="width: 50%" class="ma-2" v-if="caseAjouterJoueur">
        <v-text-field v-model="nomJ" label="Nom" class="mx-2"></v-text-field>
        <v-text-field
          v-model="PVJ"
          label="PV"
          class="mx-2"
          type="number"
        ></v-text-field>
        <v-text-field
          v-model="MPJ"
          label="MP"
          class="mx-2"
          type="number"
        ></v-text-field>
        <v-btn @click="ajouterJoueur()" color="green" class="mt-3"
          ><v-icon>mdi-plus</v-icon></v-btn
        >
      </v-row>
      <div v-for="(unJoueur, j) in joueur" :key="j + 'J'" style="width: 50%">
        <v-card :color="unJoueur.couleur.fond" width="500px" class="ml-2 mt-2">
          <v-card-title>
            <div>{{ unJoueur.nom }}</div>
            <v-btn
              @click="ouvrirAjouterStatusJoueur(j)"
              :color="unJoueur.couleur.case"
              icon
              ><v-icon>mdi-bottle-tonic-plus-outline</v-icon>
            </v-btn>
            <v-spacer></v-spacer>
            <v-btn
              icon
              :color="unJoueur.couleur.case"
              @click="supprimerJoueur(j)"
              ><v-icon>mdi-close</v-icon></v-btn
            >
          </v-card-title>
          <v-card-text>
            <div class="d-flex justify-space-around">
              <v-card
                class="text-h6 pa-2 d-flex"
                :color="unJoueur.couleur.case"
              >
                <div>PV: {{ unJoueur.PV }}/{{ unJoueur.PVMax }}</div>
                <v-text-field
                  style="width: 30px"
                  v-model="calculePV"
                  hide-details
                  class="ma-0 pa-0 ml-1"
                  @change="calculerLesPV(j)"
                ></v-text-field>
              </v-card>
              <v-card
                class="text-h6 pa-2 d-flex"
                :color="unJoueur.couleur.case"
              >
                <div>MP: {{ unJoueur.MP }}/{{ unJoueur.MPMax }}</div>
                  <v-text-field
                    style="width: 30px"
                    v-model="calculeMP"
                    hide-details
                    class="ma-0 pa-0 ml-1"
                    @change="calculerLesMP(j)"
                  ></v-text-field>
                
              </v-card>
            </div>
            <div>
              <v-card
                v-for="(unStatus, s) in unJoueur.status"
                :key="s + 'S'"
                :color="unJoueur.couleur.case"
                class="mt-3"
              >
                <v-card-title>
                  {{ unStatus.nomStatus }}
                  <v-spacer></v-spacer>
                  <v-btn
                    icon
                    :color="unJoueur.couleur.fond"
                    @click="supprimerStatus(s)"
                    ><v-icon>mdi-close</v-icon></v-btn
                  >
                </v-card-title>
                <v-card-text>
                  <div class="text-h6">
                    {{ unStatus.effetStatus }}/{{ unStatus.tourRestant }}T
                  </div>
                  <div>{{ unStatus.descripStatus }}</div>
                </v-card-text>
              </v-card>
            </div>
            <div v-if="unJoueur.ajouterStatus == true">
              <v-row no-gutters class="ml-2">
                <v-col cols="4">
                  <v-text-field
                    v-model="nomStatus"
                    label="Nom status"
                  ></v-text-field>
                </v-col>
                <v-col cols="4">
                  <v-text-field
                    class="mx-2"
                    v-model="effetStatus"
                    label="Effet"
                  ></v-text-field>
                </v-col>
                <v-col cols="4">
                  <v-text-field
                    class="mx-2"
                    v-model="tourStatus"
                    label="Tour"
                  ></v-text-field>
                </v-col>
              </v-row>
              <v-row no-gutters>
                <v-col cols="11">
                  <v-text-field
                    class="mx-2"
                    v-model="descripStatus"
                    label="Descriptif"
                  ></v-text-field>
                </v-col>
                <v-col cols="1">
                  <v-btn
                    @click="ajouterStatus(j)"
                    :color="unJoueur.couleur.case"
                    class="mt-5"
                    icon
                    ><v-icon>mdi-plus</v-icon></v-btn
                  >
                </v-col>
              </v-row>
            </div>
          </v-card-text>
        </v-card>
      </div>
    </div>
  </v-app>
</template>

<script>
export default {
  name: "App",

  data: () => ({
    caseAjouterJoueur: false,
    caseAjouterEnnemi: false,
    joueur: [],
    nomJ: "",
    PVJ: "",
    MPJ: "",
    nomStatus: "",
    tourStatus: "",
    effetStatus: "",
    descripStatus: "",
    NTour: 1,
    calculePV: "",
    calculeMP: "",
    ennemy: [],
    listeCouleur: [
      {
        fond: "red lighten-1",
        case: "red lighten-5",
      },
      {
        fond: "pink lighten-3",
        case: "pink lighten-5",
      },
      {
        fond: "purple lighten-1",
        case: "purple lighten-5",
      },
      {
        fond: "deep-purple lighten-1",
        case: "deep-purple lighten-5",
      },
    ],
  }),
  methods: {
    ajouterJoueur() {
      this.joueur.push({
        nom: this.nomJ,
        PVMax: this.PVJ,
        PV: this.PVJ,
        MPMax: this.MPJ,
        MP: this.MPJ,
        ajouterStatus: false,
        status: [],
        couleur: this.choisiCouleur(),
      });
      this.nomJ = "";
      this.PVJ = "";
      this.MPJ = "";
      this.caseAjouterJoueur = false;
    },
    choisiCouleur() {
      return this.listeCouleur[Math.floor(Math.random() * 4)];
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
        tourRestant: this.tourStatus,
        descripStatus: this.descripStatus,
      });
      this.effetStatus = "";
      this.tourStatus = "";
      this.nomStatus = "";
      this.descripStatus = "";
      leJoueur.ajouterStatus = false;
    },
    ajouterTour() {},
    renitialiserTour() {
      this.NTour = 1;
    },
    calculerLesPV(index) {
      this.joueur[index].PV = this.joueur[index].PV * 1 + this.calculePV * 1;
      this.calculePV = "";
    },
    calculerLesMP(index) {
      this.joueur[index].MP = this.joueur[index].MP * 1 + this.calculeMP * 1;
      this.calculeMP = "";
    },
  },
};
</script>
