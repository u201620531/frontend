export interface UserProfile {
  Id: string;
  Description: string;
  State: string; //A-Activo, I-Inactivo
  CreationDate?: string;
  CreationUser?: string;
}
