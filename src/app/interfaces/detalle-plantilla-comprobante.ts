export interface DetallePlantillaComprobante {
  idPlantillaComprobante: string;
  idComprobante: string;
  subDiario: string;
  numeroComprobante: string;
  fechaComprobante: string;
  glosaPrincipal: string;
  glosaDetalle: string;
  tipoConvergencia: string;
  idCuentaContable: string;
  codigoAnexo: string;
  idCentroCosto: string;
  debeHaber: string;
  importeOriginal: number;
  detalle: string;
  estado: string; //A-Activo, D-Declarado, I-Inactivo
}
