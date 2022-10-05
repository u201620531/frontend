export interface Comprobante {
  idComprobante: string;
  serie: string;
  correlativo: string;
  idTipoDocumento: string;
  idFormaPago: string;
  idProveedor: string;
  fechaEmision: string;
  fechaVencimiento: string;
  totalGravadas: number;
  totalInafectas: number;
  totalExoneradas: number;
  totalExportacion: number;
  valorCompra: number;
  igv: number;
  isc: number;
  otrosTributos: number;
  otrosCargos: number;
  descuentosGlobales: number;
  importeTotal: number;
  tipoCambio:number;
  idMoneda: string;
  serieGuia: string;
  correlativoGuia: string;
  estado: string; //A-Activo, I-Inactivo, D-Declarado, P-Asignado plantilla, 
  fechaCreacion: string;
  usuarioCreacion: string;
}
