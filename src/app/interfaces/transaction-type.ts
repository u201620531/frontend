export interface TransactionType {
  Id: string; //V-Venta, C-Compra, P-Personal
  Description: string;
  Abbreviation?: string;
  Type?: any; //R-Reporte
  State?: string; //A-Activo, I-Inactivo
  CreationDate?: string;
  CreationUser?: string;
}
