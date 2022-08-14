export interface DocumentType {
  id: string;
  description: string;
  abbreviation?: string;
  type?: string[]; //V-Venta, C-Compra, P-Personal
  status: string; //A-Activo, I-Inactivo
  creationDate?: string;
  creationUser?: string;
}
