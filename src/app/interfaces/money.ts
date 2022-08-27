export interface Money {
  idMoney: string;
  description: string;
  signo?: string;
  status?: string; //A-Activo, I-Inactivo
  creationDate?: string;
  creationUser?: string;
}
