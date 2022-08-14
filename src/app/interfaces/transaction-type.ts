export interface TransactionType {
  id: string; //V-Venta, C-Compra, P-Personal
  description: string;
  abbreviation?: string;
  type?: string[]; //R-Reporte
  status?: string; //A-Activo, I-Inactivo
  creationDate?: String;
  creationUser?: string;
}
