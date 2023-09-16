import axios from "axios";
import store from ".";

export class Utilisateur {
  private id: number;
  private nom: string;

  constructor();
  constructor(unUtilisateur: Utilisateur);
  constructor(...args: any[]) {
    if (args.length == 1) {
      this.id = args[0].id;
      this.nom = args[0].nom;
    } else {
      this.id = -1;
      this.nom = "";
    }
  }

  getId() {
    return this.id;
  }
  getNom() {
    return this.nom;
  }
}

export class Status {
  id: string;
  nom: string;
  dureeMax: number;
  duree: number;
  effet: any;
  pvmp: string;

  constructor();
  constructor(unStatus: Status);
  constructor(...args: any[]) {
    if (args.length == 1) {
      this.id = args[0].id;
      this.nom = args[0].nom;
      this.dureeMax = args[0].dureeMax;
      this.duree = args[0].duree;
      this.effet = args[0].effet;
      this.pvmp = args[0].pvmp;
    } else {
      this.id = "";
      this.nom = "";
      this.dureeMax = 0;
      this.duree = 0;
      this.effet = 0;
      this.pvmp = "";
    }
  }

  getId() {
    return this.id;
  }
  getNom() {
    return this.nom;
  }
  getDureeMax() {
    return this.dureeMax;
  }
  getDuree() {
    return this.duree;
  }
  getEffet() {
    return this.effet;
  }
  getTypePvMp() {
    return this.pvmp;
  }

  setId() {
    this.id = new Date().getTime() + "";
  }
  setNom(nom: string) {
    this.nom = nom;
  }
  setDuree(duree: number) {
    this.dureeMax = duree * 1;
    this.duree = duree * 1;
  }
  setEffet(effet: any) {
    if (isNaN(effet) == true) {
      this.effet = effet;
    } else {
      this.effet = effet * 1;
    }
  }
  setTypePvMp(pvmp: string) {
    this.pvmp = pvmp;
  }
  setDuréeInfini() {
    this.setDuree(-1307);
  }

  passerTour() {
    this.duree -= 1;
  }
}

export class CarteCouleur {
  private id: number;
  private fond: string;
  private bouton: string;

  constructor();
  constructor(couleurs: CarteCouleur);
  constructor(...args: any[]) {
    if (args.length == 1) {
      this.id = args[0].id;
      this.fond = args[0].fond;
      this.bouton = args[0].bouton;
    } else {
      this.fond = "#AB47BC";
      this.bouton = "#F3E5F5";
      this.id = 3;
    }
  }

  getId() {
    return this.id;
  }
  getFond() {
    return this.fond;
  }
  getBouton() {
    return this.bouton;
  }
  setCouleur(index: number) {
    this.fond = store.state.couleurs[index].getFond();
    this.bouton = store.state.couleurs[index].getBouton();
    this.id = store.state.couleurs[index].getId();
  }
}

export class Entiter {
  id: string;
  nom: string;
  pvMax: number;
  pv: number;
  modificateurPv: string;
  mpMax: number;
  mp: number;
  modifcateurMp: string;
  status: Status[];
  couleurFiche: CarteCouleur;
  JouE: string;

  constructor();
  constructor(uneEntiter: Entiter);
  constructor(...args: any[]) {
    if (args.length == 1) {
      this.id = args[0].id;
      this.nom = args[0].nom;
      this.pvMax = args[0].pvMax;
      this.mpMax = args[0].mpMax;
      this.pv = args[0].pv;
      this.mp = args[0].mp;
      this.status = args[0].status.map((s: Status) => {
        return new Status(s);
      });
      this.couleurFiche = new CarteCouleur(args[0].couleurFiche);
      this.JouE = args[0].JouE;
    } else {
      this.id = "";
      this.nom = "";
      this.pvMax = 0;
      this.pv = 0;
      this.mp = 0;
      this.mpMax = 0;
      this.status = [];
      this.couleurFiche = new CarteCouleur();
      this.JouE = "";
    }
    this.modifcateurMp = "";
    this.modificateurPv = "";
  }

  getId() {
    return this.id;
  }
  getNom() {
    return this.nom;
  }
  getPvMax() {
    return this.pvMax;
  }
  getPV() {
    return this.pv;
  }
  getMpMax() {
    return this.mpMax;
  }
  getMP() {
    return this.mp;
  }
  getStatus() {
    return this.status;
  }
  getCouleur() {
    return this.couleurFiche;
  }
  getJouE() {
    return this.JouE;
  }

  setId() {
    this.id = new Date().getTime() + "";
  }
  setNom(nom: string) {
    this.nom = nom;
  }
  setPVMax(pv: number) {
    this.pvMax = pv * 1;
    this.pv = pv * 1;
  }
  setMPMax(mp: number) {
    this.mpMax = mp * 1;
    this.mp = mp * 1;
  }
  setJouE(JouE: string) {
    this.JouE = JouE;
  }

  modifierPV(modificateur: number) {
    if (isNaN(modificateur) == false) {
      this.pv = this.pv * 1 + modificateur * 1;
      this.modificateurPv = "";
    }
  }
  modifierMP(modificateur: number) {
    if (isNaN(modificateur) == false) {
      this.mp = this.mp * 1 + modificateur * 1;
      this.modifcateurMp = "";
    }
  }
  supprimerStatus(index: number) {
    axios
      .post(store.state.serverphp + "jeu.php", {
        action: "SUPPRIMER_STATUS",
        idStatus: this.status[index].getId(),
        idEntiter: this.getId(),
      })
      .then(() => {
        this.status.splice(index, 1);
      });
  }

  async passerUnTour(lesStatusDejaUtiliser: Status[]) {
    if (this.status.length != 0) {
      let i = 0;
      const indexASupprimer: number[] = [];
      for (const unStatus of this.status) {
        const typePvMp = unStatus.getTypePvMp();
        if (typePvMp == "p") {
          this.modifierPV(unStatus.getEffet());
        } else if (typePvMp == "m") {
          this.modifierMP(unStatus.getEffet());
        }
        const dejContabiliser = lesStatusDejaUtiliser.find(
          (s: Status) => s.getId() == unStatus.getId()
        );
        if (unStatus.getDuree() != -1307 && dejContabiliser === undefined) {
          unStatus.passerTour();
          lesStatusDejaUtiliser.push(unStatus);
        }
        if (unStatus.getDuree() <= 0 && unStatus.getDuree() != -1307) {
          indexASupprimer.push(i);
        }
        i++;
      }
      if (indexASupprimer.length != 0) {
        i = indexASupprimer.length - 1;
        while (i >= 0) {
          await axios
            .post(store.state.serverphp + "jeu.php", {
              action: "SUPPRIMER_STATUS",
              idStatus: this.status[indexASupprimer[i]].getId(),
              idEntiter: this.getId(),
            })
            .then(() => {
              this.status.splice(indexASupprimer[i], 1);
              i--;
            });
        }
      }
    }
    return lesStatusDejaUtiliser;
  }
}
