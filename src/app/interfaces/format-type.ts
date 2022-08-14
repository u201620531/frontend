export interface FormatType {
  id: string;
  description: string;
  abbreviation?: string;
  type?: string[]; //V-Venta, C-Compra, P-Personal, C-Contabilidad
  status: string; //A-Activo, I-Inactivo
  creationDate?: string;
  creationUser?: string;
}
