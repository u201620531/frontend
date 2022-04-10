export interface FormatType {
  Id: string;
  Description: string;
  Abbreviation?: string;
  Type?: string; //V-Venta, C-Compra, P-Personal, C-Contabilidad
  State?: string; //A-Activo, I-Inactivo
}
