export interface PlantillaComprobante {
  idPlantillaComprobante: string;
  nroTicketEnvio: string;
  fechaCarga: string;
  fechaDeclaracion: string;
  observacion: string;
  estado: string; //A-Activo, I-Inactivo
  fechaCreacion: string;
  usuarioCreacion?: string;
}
