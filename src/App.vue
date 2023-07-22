<template>
  <v-app>
    <v-card
      style="height: 50px"
      color="purple lighten-5"
      class="d-flex align-center justify-space-between"
    >
      <v-btn icon @click="ouvrirDialogueAjoutEntiter(true)" class="ml-5">
        <v-icon>mdi-account-plus</v-icon>
      </v-btn>
      <div class="d-flex align-center">
        <div>Tour: {{ numTour }}</div>
        <v-btn icon><v-icon>mdi-plus</v-icon></v-btn>
        <v-btn icon><v-icon>mdi-refresh</v-icon></v-btn>
      </div>
      <v-btn icon @click="ouvrirDialogueAjoutEntiter(false)" class="mr-5">
        <v-icon>mdi-virus-outline</v-icon>
      </v-btn>
    </v-card>
    <v-main>
      <div class="d-flex">
        <div class="ma-2 d-flex justify-center align-center" style="width: 50%">
          <v-card
            v-for="(unJoueur, j) in joueurs"
            :key="j + 'unJoueur'"
            :color="unJoueur.getCouleur().getFond()"
            class="ma-1"
            min-width="10px"
            min-height="10px"
          >
            <v-card-title class="pb-0 d-flex justify-center">{{
              unJoueur.getNom()
            }}</v-card-title>
            <v-card-text>
              <div class="d-flex align-center font-weight-black black--text">
                <div class="d-flex mr-2">
                  <div class="mt-3">
                    Pv: {{ unJoueur.getPV() }} / {{ unJoueur.getPvMax() }}
                  </div>
                  <v-text-field
                    style="width: 40px"
                    type="number"
                    hide-details
                    class="mt-0 pt-0 ml-1"
                    :color="unJoueur.getCouleur().getCase()"
                  ></v-text-field>
                </div>
                <div class="d-flex align-center font-weight-black black--text">
                  <div class="mt-3">
                    Mp: {{ unJoueur.getMP() }} / {{ unJoueur.getMpMax() }}
                  </div>
                  <v-text-field
                    style="width: 40px"
                    type="number"
                    hide-details
                    class="mt-0 pt-0 ml-1"
                    :color="unJoueur.getCouleur().getCase()"
                  ></v-text-field>
                </div>
              </div>
              <div class="font-weight-black black--text">
                Status:
                <v-btn
                  icon
                  :color="unJoueur.getCouleur().getCase()"
                  @click="ouvrirDialogueStatus(unJoueur)"
                >
                  <v-icon>mdi-plus</v-icon>
                </v-btn>
                <div class="d-flex flex-wrap">
                  <v-card
                    v-for="(unStatus, s) in unJoueur.getStatus()"
                    :key="s + 'lestatus' + j"
                    class="ma-1"
                  >
                    <v-card-title class="pb-0">{{
                      unStatus.getNom()
                    }}</v-card-title>
                    <v-card-text class="font-weight-black black--text">
                      <div>Durée: {{ unStatus.getDuree() }}</div>
                      <div>
                        Effet:
                        {{
                          unStatus.getEffet() <= 0
                            ? unStatus.getEffet()
                            : "+" + unStatus.getEffet()
                        }}
                        {{
                          unStatus.getTypePvMp() == "p"
                            ? "Pv"
                            : unStatus.getTypePvMp() == "m"
                            ? "Mp"
                            : ""
                        }}
                      </div>
                    </v-card-text>
                  </v-card>
                </div>
              </div>
            </v-card-text>
          </v-card>
        </div>
        <div class="ma-2 d-flex justify-center align-center" style="width: 50%">
          <v-card
            v-for="(unJoueur, j) in ennemis"
            :key="j + 'unJoueur'"
            :color="unJoueur.getCouleur().getFond()"
            class="ma-1"
            min-width="10px"
            min-height="10px"
          >
            <v-card-title class="pb-0 d-flex justify-center">{{
              unJoueur.getNom()
            }}</v-card-title>
            <v-card-text>
              <div class="d-flex align-center font-weight-black black--text">
                <div class="d-flex mr-2">
                  <div class="mt-3">
                    Pv: {{ unJoueur.getPV() }} / {{ unJoueur.getPvMax() }}
                  </div>
                  <v-text-field
                    style="width: 40px"
                    type="number"
                    hide-details
                    class="mt-0 pt-0 ml-1"
                    :color="unJoueur.getCouleur().getCase()"
                  ></v-text-field>
                </div>
                <div class="d-flex align-center font-weight-black black--text">
                  <div class="mt-3">
                    Mp: {{ unJoueur.getMP() }} / {{ unJoueur.getMpMax() }}
                  </div>
                  <v-text-field
                    style="width: 40px"
                    type="number"
                    hide-details
                    class="mt-0 pt-0 ml-1"
                    :color="unJoueur.getCouleur().getCase()"
                  ></v-text-field>
                </div>
              </div>
              <div class="font-weight-black black--text">
                Status:
                <v-btn
                  icon
                  :color="unJoueur.getCouleur().getCase()"
                  @click="ouvrirDialogueStatus(unJoueur)"
                >
                  <v-icon>mdi-plus</v-icon>
                </v-btn>
                <div class="d-flex flex-wrap">
                  <v-card
                    v-for="(unStatus, s) in unJoueur.getStatus()"
                    :key="s + 'lestatus' + j"
                    class="ma-1"
                  >
                    <v-card-title class="pb-0">{{
                      unStatus.getNom()
                    }}</v-card-title>
                    <v-card-text class="font-weight-black black--text">
                      <div>Durée: {{ unStatus.getDuree() }}</div>
                      <div>
                        Effet:
                        {{
                          unStatus.getEffet() <= 0
                            ? unStatus.getEffet()
                            : "+" + unStatus.getEffet()
                        }}
                        {{
                          unStatus.getTypePvMp() == "p"
                            ? "Pv"
                            : unStatus.getTypePvMp() == "m"
                            ? "Mp"
                            : ""
                        }}
                      </div>
                    </v-card-text>
                  </v-card>
                </div>
              </div>
            </v-card-text>
          </v-card>
        </div>
      </div>

      <v-dialog max-width="400" v-model="dialogueAjoutEntiter">
        <v-card>
          <v-card-title>
            <div>Nouveau joueur</div>
            <v-spacer></v-spacer>
            <v-btn icon color="error" @click="fermerDialogueAjoutEntiter()">
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </v-card-title>
          <v-card-text>
            <v-text-field label="Nom" v-model="uneEntiter.nom"></v-text-field>
            <div class="d-flex">
              <v-text-field
                v-model="uneEntiter.pvMax"
                label="Pv"
                type="number"
                hide-details
                class="ma-1"
              ></v-text-field>
              <v-text-field
                v-model="uneEntiter.mpMax"
                label="Mp"
                type="number"
                hide-details
                class="ma-1"
              ></v-text-field>
            </div>
            <v-btn
              color="purple lighten-5"
              class="mt-2"
              @click="enregistrerEntiter()"
            >
              Enregistrer
            </v-btn>
          </v-card-text>
        </v-card>
      </v-dialog>

      <v-dialog v-model="dialogueAjouterStatus" width="400px">
        <v-card>
          <v-card-title class="pb-0">
            <div>Nouveau Status</div>
            <v-spacer></v-spacer>
            <v-btn icon color="error"><v-icon>mdi-close</v-icon></v-btn>
          </v-card-title>
          <v-card-text>
            <v-text-field
              hide-details
              v-model="unStatus.nom"
              label="Nom"
            ></v-text-field>
            <v-text-field
              hide-details
              v-model="unStatus.dureeMax"
              type="number"
              label="Nombre de tour"
            ></v-text-field>
            <div>
              <div class="mb-n5 mt-1">Effet:</div>
              <div class="d-flex">
                <v-text-field
                  hide-details
                  v-model="unStatus.effet"
                  type="number"
                ></v-text-field>
                <v-select
                  hide-details
                  v-model="unStatus.pvmp"
                  :items="pvMp"
                ></v-select>
              </div>
            </div>
            <v-btn
              class="mt-2"
              color="purple lighten-5"
              @click="enregistrerStatus()"
              >Enregistrer</v-btn
            >
          </v-card-text>
        </v-card>
      </v-dialog>
    </v-main>
  </v-app>
</template>

<script lang="ts">
import axios from "axios";
import Vue from "vue";
import { Entiter, Status } from "./store/type";

export default Vue.extend({
  name: "App",
  data() {
    return {
      numTour: 0,
      joueurs: [] as Entiter[],
      ennemis: [] as Entiter[],
      uneEntiter: new Entiter(),
      unStatus: new Status(),
      cestUnJoueur: false,
      pvMp: [
        { value: "p", text: "Pv" },
        { value: "m", text: "Mp" },
      ],
      dialogueAjoutEntiter: false,
      dialogueAjouterStatus: false,
    };
  },
  methods: {
    initialisation() {
      const unJoueur = new Entiter();
      unJoueur.setNom("Jean-jacque");
      unJoueur.setMPMax(50);
      unJoueur.setPVMax(30);
      const unStatus = new Status();
      unStatus.setDuree(5);
      unStatus.setNom("Poison");
      unStatus.setTypePvMp("p");
      unStatus.setEffet(-5);
      unJoueur.getStatus().push(unStatus);
      this.joueurs.push(unJoueur);
    },
    ouvrirDialogueAjoutEntiter(cestUnJoueur: boolean) {
      this.cestUnJoueur = cestUnJoueur;
      this.dialogueAjoutEntiter = true;
      this.uneEntiter = new Entiter();
    },
    enregistrerEntiter() {
      this.uneEntiter.setMPMax(this.uneEntiter.getMpMax());
      this.uneEntiter.setPVMax(this.uneEntiter.getPvMax());
      if (this.cestUnJoueur == true) {
        this.joueurs.push(this.uneEntiter);
      } else {
        this.ennemis.push(this.uneEntiter);
      }
      this.fermerDialogueAjoutEntiter();
    },
    fermerDialogueAjoutEntiter() {
      this.dialogueAjoutEntiter = false;
      this.uneEntiter = new Entiter();
    },
    ouvrirDialogueStatus(uneEntiter: Entiter) {
      this.dialogueAjouterStatus = true;
      this.unStatus = new Status();
      this.uneEntiter = uneEntiter;
    },
    enregistrerStatus() {
      this.unStatus.setDuree(this.unStatus.getDureeMax());
      this.unStatus.setEffet(this.unStatus.getEffet());
      this.uneEntiter.getStatus().push(this.unStatus);
      this.fermerDialogueStatus();
    },
    fermerDialogueStatus() {
      this.dialogueAjouterStatus = false;
      this.unStatus = new Status();
      this.uneEntiter = new Entiter();
    },
  },
  mounted() {
    this.initialisation();
  },
});
</script>
