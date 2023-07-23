export class Status {
  nom: string;
  dureeMax: number;
  duree: number;
  effet: number;
  pvmp: string;

  constructor();
  constructor(unStatus: Status);
  constructor(...args: any[]) {
    if (args.length == 1) {
      this.nom = args[0].nom;
      this.dureeMax = args[0].dureeMax;
      this.duree = args[0].duree;
      this.effet = args[0].effet;
      this.pvmp = args[0].pvmp;
    } else {
      this.nom = "";
      this.dureeMax = 0;
      this.duree = 0;
      this.effet = 0;
      this.pvmp = "";
    }
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

  setNom(nom: string) {
    this.nom = nom;
  }
  setDuree(duree: number) {
    this.dureeMax = duree * 1;
    this.duree = duree * 1;
  }
  setEffet(effet: number) {
    this.effet = effet * 1;
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

const listeCouleur = require("../assets/listeCouleur.json");
export class CarteCouleur {
  private fond: string;
  private case: string;

  constructor() {
    const index = Math.floor(Math.random() * listeCouleur.length);
    this.fond = listeCouleur[index].fond;
    this.case = listeCouleur[index].case;
  }

  getFond() {
    return this.fond;
  }
  getCase() {
    return this.case;
  }
}

export class Entiter {
  nom: string;
  pvMax: number;
  pv: number;
  modificateurPv: string;
  mpMax: number;
  mp: number;
  modifcateurMp: string;
  status: Status[];
  couleurFiche: CarteCouleur;

  constructor();
  constructor(uneEntiter: Entiter);
  constructor(...args: any[]) {
    if (args.length == 1) {
      this.nom = args[0].nom;
      this.pvMax = args[0].pvMax;
      this.mpMax = args[0].mpMax;
      this.pv = args[0].pv;
      this.mp = args[0].mp;
      this.status = args[0].status.map((s: Status) => {
        return new Status(s);
      });
    } else {
      this.nom = "";
      this.pvMax = 0;
      this.pv = 0;
      this.mp = 0;
      this.mpMax = 0;
      this.status = [];
    }
    this.couleurFiche = new CarteCouleur();
    this.modifcateurMp = "";
    this.modificateurPv = "";
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

  modifierPV(modificateur: number) {
    this.pv += modificateur * 1;
    this.modificateurPv = "";
  }
  modifierMP(modificateur: number) {
    this.mp += modificateur * 1;
    this.modifcateurMp = "";
  }

  passerUnTour() {
    if (this.status.length != 0) {
      let i = 0;
      for (const unStatus of this.status) {
        const typePvMp = unStatus.getTypePvMp();
        if (typePvMp == "p") {
          this.modifierPV(unStatus.getEffet());
        } else if (typePvMp == "m") {
          this.modifierMP(unStatus.getEffet());
        }
        unStatus.passerTour();
        if (unStatus.getDuree() <= 0 && unStatus.getDuree() != -1307) {
          this.status.splice(i, 1);
        }
        i++;
      }
    }
  }
}