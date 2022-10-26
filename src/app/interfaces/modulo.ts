export interface Modulo {
  idModulo: string;
  nombreModulo: string;
  showModulo:boolean;
  isExpandedModulo:boolean;
  isShowingModulo:boolean;
  iconoModulo:string;
  vistaModulo: string;
  esPrincipal: number;
  menu: Array<{
    idMenu: string;
    nombreMenu: string;
    vistaMenu: string;
    iconoMenu:string;
    showMenu:boolean;
    isExpandedMenu:boolean;
    isShowingMenu:boolean;
    esPadre: number;
    subMenu: Array<{
      idSubMenu: string;
      nombreSubMenu: string;
      vistaSubMenu: string;
      banner: number;
    }>;
  }>;
}
