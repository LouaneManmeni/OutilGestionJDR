<template>
  <v-app>
    <v-card
      style="height: 50px"
      color="purple lighten-5"
      class="d-flex align-center justify-space-between"
    >
      <div>
        <v-btn icon @click="ouvrirDialogueAjoutEntiter(true)" class="ml-5">
          <v-icon>mdi-account-plus</v-icon>
        </v-btn>
        <v-btn icon @click="ouvrirDialogueMultiStatus('j')">
          <v-icon>mdi-needle</v-icon>
        </v-btn>
      </div>
      <div class="d-flex align-center">
        <div>Tour: {{ numTour }}</div>
        <v-btn icon @click="passerTour()"><v-icon>mdi-plus</v-icon></v-btn>
        <v-btn icon @click="resetTour()"><v-icon>mdi-refresh</v-icon></v-btn>
      </div>
      <div>
        <v-btn icon @click="ouvrirDialogueMultiStatus('e')">
          <v-icon>mdi-needle</v-icon>
        </v-btn>
        <v-btn icon @click="ouvrirDialogueAjoutEntiter(false)" class="mr-5">
          <v-icon>mdi-virus-outline</v-icon>
        </v-btn>
      </div>
    </v-card>
    <v-main>
      <div class="d-flex">
        <div
          class="ma-2 d-flex flex-wrap justify-center align-center"
          style="width: 50%"
        >
          <v-card
            v-for="(unJoueur, j) in joueurs"
            :key="j + 'unJoueur'"
            :color="unJoueur.getCouleur().getFond()"
            class="ma-1"
            min-width="10px"
            min-height="10px"
            max-width="400px"
          >
            <v-card-title class="pb-0 d-flex justify-space-between">
              <v-btn
                :color="unJoueur.getCouleur().getBouton()"
                icon
                @click="ouvrirModificationEntiter(unJoueur, true)"
              >
                <v-icon>mdi-pencil</v-icon>
              </v-btn>
              <div>
                {{ unJoueur.getNom() }}
              </div>
              <v-btn
                icon
                :color="unJoueur.getCouleur().getBouton()"
                @click="supprimerEntiter(unJoueur, 'j')"
              >
                <v-icon>mdi-close</v-icon>
              </v-btn>
            </v-card-title>
            <v-card-text>
              <div class="d-flex align-center font-weight-black black--text">
                <div class="d-flex mr-2">
                  <div class="mt-3">
                    Pv: {{ unJoueur.getPV() }} / {{ unJoueur.getPvMax() }}
                  </div>
                  <v-text-field
                    v-model="unJoueur.modificateurPv"
                    style="width: 40px"
                    type="number"
                    hide-details
                    class="mt-0 pt-0 ml-1"
                    :color="unJoueur.getCouleur().getBouton()"
                    @change="
                      unJoueur.modifierPV(parseInt(unJoueur.modificateurPv))
                    "
                  ></v-text-field>
                </div>
                <div class="d-flex align-center font-weight-black black--text">
                  <div class="mt-3">
                    Mp: {{ unJoueur.getMP() }} / {{ unJoueur.getMpMax() }}
                  </div>
                  <v-text-field
                    v-model="unJoueur.modifcateurMp"
                    style="width: 40px"
                    type="number"
                    hide-details
                    class="mt-0 pt-0 ml-1"
                    :color="unJoueur.getCouleur().getBouton()"
                    @change="
                      unJoueur.modifierMP(parseInt(unJoueur.modifcateurMp))
                    "
                  ></v-text-field>
                </div>
              </div>
              <div class="font-weight-black black--text">
                Status:
                <v-btn
                  icon
                  :color="unJoueur.getCouleur().getBouton()"
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
                    <v-card-title
                      class="pb-0 px-1 d-flex justify-space-between"
                    >
                      <v-btn
                        icon
                        :color="unJoueur.getCouleur().getFond()"
                        @click="ouvrirModificationStatus(unJoueur, unStatus)"
                      >
                        <v-icon>mdi-pencil</v-icon>
                      </v-btn>
                      <div>
                        {{ unStatus.getNom() }}
                      </div>
                      <v-btn
                        icon
                        :color="unJoueur.getCouleur().getFond()"
                        @click="unJoueur.supprimerStatus(s)"
                      >
                        <v-icon>mdi-close</v-icon>
                      </v-btn>
                    </v-card-title>
                    <v-card-text class="font-weight-black black--text">
                      <div v-if="unStatus.getDuree() != -1307">
                        Durée: {{ unStatus.getDuree() }}
                      </div>
                      <div v-else><v-icon>mdi-infinity</v-icon></div>
                      <div>
                        Effet:
                        {{
                          isNaN(unStatus.getEffet()) == true
                            ? unStatus.getEffet()
                            : unStatus.getEffet() <= 0
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
            <v-card-title class="pb-0 d-flex justify-space-between">
              <v-btn
                :color="unJoueur.getCouleur().getBouton()"
                icon
                @click="ouvrirModificationEntiter(unJoueur, false)"
              >
                <v-icon>mdi-pencil</v-icon>
              </v-btn>
              <div class="mr-n5">
                {{ unJoueur.getNom() }}
              </div>
              <v-btn
                icon
                :color="unJoueur.getCouleur().getBouton()"
                @click="supprimerEntiter(unJoueur, 'e')"
              >
                <v-icon>mdi-close</v-icon>
              </v-btn>
            </v-card-title>
            <v-card-text>
              <div class="d-flex align-center font-weight-black black--text">
                <div class="d-flex mr-2">
                  <div class="mt-3">
                    Pv: {{ unJoueur.getPV() }} / {{ unJoueur.getPvMax() }}
                  </div>
                  <v-text-field
                    v-model="unJoueur.modificateurPv"
                    style="width: 40px"
                    type="number"
                    hide-details
                    class="mt-0 pt-0 ml-1"
                    :color="unJoueur.getCouleur().getBouton()"
                    @change="
                      unJoueur.modifierPV(parseInt(unJoueur.modificateurPv))
                    "
                  ></v-text-field>
                </div>
                <div class="d-flex align-center font-weight-black black--text">
                  <div class="mt-3">
                    Mp: {{ unJoueur.getMP() }} / {{ unJoueur.getMpMax() }}
                  </div>
                  <v-text-field
                    v-model="unJoueur.modifcateurMp"
                    style="width: 40px"
                    type="number"
                    hide-details
                    class="mt-0 pt-0 ml-1"
                    :color="unJoueur.getCouleur().getBouton()"
                    @change="
                      unJoueur.modifierMP(parseInt(unJoueur.modifcateurMp))
                    "
                  ></v-text-field>
                </div>
              </div>
              <div class="font-weight-black black--text">
                Status:
                <v-btn
                  icon
                  :color="unJoueur.getCouleur().getBouton()"
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
                    <v-card-title
                      class="pb-0 px-1 d-flex justify-space-between"
                    >
                      <v-btn
                        icon
                        :color="unJoueur.getCouleur().getFond()"
                        @click="ouvrirModificationStatus(unJoueur, unStatus)"
                      >
                        <v-icon>mdi-pencil</v-icon>
                      </v-btn>
                      <div>
                        {{ unStatus.getNom() }}
                      </div>
                      <v-btn
                        icon
                        :color="unJoueur.getCouleur().getFond()"
                        @click="unJoueur.supprimerStatus(s)"
                      >
                        <v-icon>mdi-close</v-icon>
                      </v-btn>
                    </v-card-title>
                    <v-card-text class="font-weight-black black--text">
                      <div v-if="unStatus.getDuree() != -1307">
                        Durée: {{ unStatus.getDuree() }}
                      </div>
                      <div v-else><v-icon>mdi-infinity</v-icon></div>
                      <div>
                        Effet:
                        {{
                          isNaN(unStatus.getEffet()) == true
                            ? unStatus.getEffet()
                            : unStatus.getEffet() <= 0
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
            <v-btn
              icon
              color="error"
              @click="
                fermerDialogueModicationEntiter(), fermerDialogueAjoutEntiter()
              "
            >
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
            <div class="d-flex mt-3">
              <div>Couleur fiche:</div>
              <div
                @click="dialogueCouleur = true"
                class="ml-1"
                :style="
                  'background:radial-gradient(' +
                  uneEntiter.getCouleur().getBouton() +
                  ', ' +
                  uneEntiter.getCouleur().getFond() +
                  ') ; border-radius: 50%; width: 20px; height: 20px;'
                "
              ></div>
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

      <v-dialog persistent v-model="dialogueCouleur" max-width="340px">
        <v-card>
          <v-card-title class="pb-0">
            <div>Couleur disponible:</div>
            <v-spacer></v-spacer>
            <v-btn icon @click="dialogueCouleur = false" color="error">
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </v-card-title>
          <v-card-text class="d-flex flex-wrap">
            <div
              v-for="(uneCouleur, c) in listeCouleur"
              :key="c + 'lesCouleurs'"
            >
              <div
                class="ma-1"
                :style="
                  'background:radial-gradient(' +
                  uneCouleur.getBouton() +
                  ', ' +
                  uneCouleur.getFond() +
                  ') ; border-radius: 50%; width: 40px; height: 40px;'
                "
                @click="changezCouleur(c)"
              ></div>
            </div>
          </v-card-text>
        </v-card>
      </v-dialog>

      <v-dialog v-model="dialogueAjouterStatus" width="400px">
        <v-card>
          <v-card-title class="pb-0">
            <div>Nouveau Status</div>
            <v-spacer></v-spacer>
            <v-btn
              icon
              color="error"
              @click="
                fermerDialogueStatusModification(), fermerDialogueStatus()
              "
            >
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </v-card-title>
          <v-card-text>
            <v-text-field
              hide-details
              v-model="unStatus.nom"
              label="Nom"
            ></v-text-field>
            <div class="d-flex justify-center">
              <v-text-field
                hide-details
                v-model="unStatus.dureeMax"
                type="number"
                label="Nombre de tour"
                v-if="unStatus.getDureeMax() != -1307"
              ></v-text-field>
              <v-btn icon class="mt-5" @click="unStatus.setDuréeInfini()">
                <v-icon>mdi-infinity</v-icon>
              </v-btn>
              <v-btn
                text
                @click="unStatus.setDuree(0)"
                class="mt-5"
                v-if="unStatus.getDureeMax() == -1307"
              >
                Annuler
              </v-btn>
            </div>
            <div>
              <div class="mb-n5 mt-1">Effet:</div>
              <div class="d-flex">
                <v-text-field
                  hide-details
                  v-model="unStatus.effet"
                  type="number"
                  v-if="unStatus.getTypePvMp() != 'a'"
                ></v-text-field>
                <v-text-field
                  hide-details
                  v-model="unStatus.effet"
                  v-else
                ></v-text-field>
                <v-select
                  class="ml-1"
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
      <v-snackbar v-model="snak_visible">
        {{ snakbar_text }}
        <template v-slot:action="{ attrs }">
          <v-btn
            color="primary"
            text
            timeout="5100"
            v-bind="attrs"
            @click="snak_visible = false"
          >
            Fermer
          </v-btn>
        </template>
      </v-snackbar>
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
      unsubcribe: null as any,
      numTour: 1,
      joueurs: [] as Entiter[],
      ennemis: [] as Entiter[],
      uneEntiter: new Entiter(),
      uneEntiterTampon: new Entiter(),
      unStatus: new Status(),
      unStatusTampon: new Status(),
      multiStatus: false,
      joueurOuEnnemi: "",
      cestUnJoueur: false,
      pvMp: [
        { value: "p", text: "Pv" },
        { value: "m", text: "Mp" },
        { value: "a", text: "Autre" },
      ],
      dialogueAjoutEntiter: false,
      dialogueAjouterStatus: false,
      dialogueCouleur: false,
      listeCouleur: [] as any,
      snak_visible: false,
      snakbar_text: "",
    };
  },
  methods: {
    async initialisation() {
      await this.$store.dispatch("chargerCouleur");
      axios
        .post(this.$store.state.serverphp + "jeu.php", {
          action: "INI",
        })
        .then((response) => {
          this.joueurs = response.data.joueurs.map((j: Entiter) => {
            return new Entiter(j);
          });
          this.ennemis = response.data.ennemis.map((e: Entiter) => {
            return new Entiter(e);
          });
        });
    },
    ouvrirDialogueAjoutEntiter(cestUnJoueur: boolean) {
      this.cestUnJoueur = cestUnJoueur;
      this.dialogueAjoutEntiter = true;
      this.uneEntiter = new Entiter();
    },
    ouvrirModificationEntiter(uneEntiter: Entiter, cestUnJoueur: boolean) {
      this.uneEntiter = uneEntiter;
      this.uneEntiterTampon = new Entiter(uneEntiter);
      this.cestUnJoueur = cestUnJoueur;
      this.dialogueAjoutEntiter = true;
    },
    enregistrerEntiter() {
      //Pour que se soit de vrais number
      this.uneEntiter.setPVMax(this.uneEntiter.getPvMax());
      this.uneEntiter.setMPMax(this.uneEntiter.getMpMax());
      if (this.uneEntiterTampon.getId() == "") {
        this.uneEntiter.setId();
        if (this.cestUnJoueur == true) {
          this.joueurs.push(this.uneEntiter);
          this.uneEntiter.setJouE("J");
        } else {
          this.ennemis.push(this.uneEntiter);
          this.uneEntiter.setJouE("E");
        }
      }
      axios.post(this.$store.state.serverphp + "jeu.php", {
        action: "ENREGISTRER_ENTITER",
        entiter: this.uneEntiter,
      });

      this.fermerDialogueAjoutEntiter();
    },
    fermerDialogueAjoutEntiter() {
      this.uneEntiterTampon = new Entiter();
      this.dialogueAjoutEntiter = false;
      this.uneEntiter = new Entiter();
    },
    fermerDialogueModicationEntiter() {
      if (this.uneEntiterTampon.getId() != "") {
        if (this.cestUnJoueur == true) {
          const index = this.joueurs.findIndex(
            (j: Entiter) => this.uneEntiterTampon.getId() == j.getId()
          );
          if (index != -1) {
            this.joueurs.splice(index, 1, this.uneEntiterTampon);
          }
        } else {
          const index = this.ennemis.findIndex(
            (j: Entiter) => this.uneEntiterTampon.getId() == j.getId()
          );
          if (index != -1) {
            this.ennemis.splice(index, 1, this.uneEntiterTampon);
          }
        }
      }
    },
    supprimerEntiter(uneEntiter: Entiter, liste: string) {
      if (liste == "j") {
        const index = this.joueurs.findIndex(
          (e: Entiter) => e.getId() == uneEntiter.getId()
        );
        if (index != -1) {
          this.joueurs.splice(index, 1);
        }
      } else if (liste == "e") {
        const index = this.ennemis.findIndex(
          (e: Entiter) => e.getId() == uneEntiter.getId()
        );
        if (index != -1) {
          this.ennemis.splice(index, 1);
        }
      }
      axios.post(this.$store.state.serverphp + "jeu.php", {
        action: "SUPPRIMER_ENTITER",
        idEntiter: uneEntiter.getId(),
      });
    },
    changezCouleur(index: number) {
      this.uneEntiter.getCouleur().setCouleur(index);
      this.dialogueCouleur = false;
    },
    ouvrirDialogueStatus(uneEntiter: Entiter) {
      this.dialogueAjouterStatus = true;
      this.unStatus = new Status();
      this.uneEntiter = uneEntiter;
    },
    ouvrirModificationStatus(uneEntiter: Entiter, unStatus: Status) {
      this.uneEntiter = uneEntiter;
      this.unStatus = unStatus;
      this.unStatusTampon = new Status(unStatus);
      this.dialogueAjouterStatus = true;
    },
    ouvrirDialogueMultiStatus(jOe: string) {
      if (
        (jOe == "j" && this.joueurs.length == 0) ||
        (jOe == "e" && this.ennemis.length == 0)
      ) {
        const phrase = jOe == "j" ? "Joueur" : jOe == "e" ? "Ennemie" : "";
        this.snackbarVisible(
          "Vous ne pouvez ajouter de status au groupe de " +
            phrase +
            " car il est vide."
        );
      } else {
        this.multiStatus = true;
        this.joueurOuEnnemi = jOe;
        this.unStatus = new Status();
        this.dialogueAjouterStatus = true;
      }
    },
    enregistrerStatus() {
      this.unStatus.setDuree(this.unStatus.getDureeMax());
      this.unStatus.setEffet(this.unStatus.getEffet());
      if (this.multiStatus == true) {
        this.unStatus.setId();
        if (this.joueurOuEnnemi == "j") {
          for (const uneEntiter of this.joueurs) {
            uneEntiter.getStatus().push(this.unStatus);
            axios.post(this.$store.state.serverphp + "jeu.php", {
              action: "ENREGISTRER_STATUS",
              entiter: uneEntiter,
            });
          }
        } else if (this.joueurOuEnnemi == "e") {
          for (const uneEntiter of this.ennemis) {
            uneEntiter.getStatus().push(this.unStatus);
            axios.post(this.$store.state.serverphp + "jeu.php", {
              action: "ENREGISTRER_STATUS",
              entiter: uneEntiter,
            });
          }
        }
      } else {
        if (this.unStatusTampon.getId() == "") {
          this.unStatus.setId();
          this.uneEntiter.getStatus().push(this.unStatus);
        } else {
          const index = this.uneEntiter
            .getStatus()
            .findIndex((s: Status) => s.getId() == this.unStatus.getId());
          if (index != -1) {
            this.uneEntiter.getStatus().splice(index, 1, this.unStatus);
          }
        }
        axios
          .post(this.$store.state.serverphp + "jeu.php", {
            action: "ENREGISTRER_STATUS",
            entiter: this.uneEntiter,
          })
          .then((response) => {
            console.log(response);
          });
      }
      this.fermerDialogueStatus();
    },
    fermerDialogueStatus() {
      this.dialogueAjouterStatus = false;
      this.unStatus = new Status();
      this.uneEntiter = new Entiter();
      this.unStatusTampon = new Status();
      this.multiStatus = false;
      this.joueurOuEnnemi = "";
    },
    fermerDialogueStatusModification() {
      if (this.unStatusTampon.getId() != "") {
        const index = this.uneEntiter
          .getStatus()
          .findIndex((s: Status) => s.getId() == this.uneEntiterTampon.getId());
        if (index != -1) {
          this.uneEntiter.getStatus().splice(index, 1, this.unStatusTampon);
        }
      }
    },
    passerTour() {
      this.numTour += 1;
      for (const unJoueur of this.joueurs) {
        unJoueur.passerUnTour();
      }
      for (const unEnnemie of this.ennemis) {
        unEnnemie.passerUnTour();
      }
    },
    resetTour() {
      this.numTour = 1;
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
  created() {
    this.unsubcribe = this.$store.subscribe((mutation) => {
      switch (mutation.type) {
        case "majCouleur":
          this.listeCouleur = this.$store.state.couleurs;
      }
    });
  },
  mounted() {
    this.initialisation();
  },
});
</script>
