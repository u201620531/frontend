export interface Modulo {
  idModulo: string;
  nombreModulo: string;
  vistaModulo: string;
  esPrincipal: number;
  menu: Array<{
    idMenu: string;
    nombreMenu: string;
    vistaMenu: string;
    esPadre: number;
    subMenu: Array<{
      idSubMenu: string;
      nombreSubMenu: string;
      vistaSubMenu: string;
      banner: number;
    }>;
  }>;
}
