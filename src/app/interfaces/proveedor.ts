export interface Proveedor {
  idProveedor: string;
  idTipoProveedor: string; //N-Natural, J-Jurídico
  idTipoDocumento: string;
  nroDocumento: string;
  razonSocial: string;
  nombreComercial?: string;
  direccion?: string;
  direccionFiscal?: string;
  email1: string;
  email2: string;
  estado: string; //A-Activo, I-Inactivo
  fechaCreacion: string;
  usuarioCreacion?: string;
}
