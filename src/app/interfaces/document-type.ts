export interface DocumentType {
  Id: string;
  Description: string;
  Abbreviation?: string;
  Type?: string; //V-Venta, C-Compra, P-Personal
  State?: string; //A-Activo, I-Inactivo
}
