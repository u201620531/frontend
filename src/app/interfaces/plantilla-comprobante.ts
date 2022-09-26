import { DetallePlantillaComprobante } from './detalle-plantilla-comprobante';

export interface PlantillaComprobante {
  idPlantillaComprobante: string;
  nroTicketEnvio: string;
  fechaDeclaracion: string;
  observacion: string;
  estado: string; //A-Activo, I-Inactivo
  fechaCreacion: string;
  usuarioCreacion?: string;
  detalle?: DetallePlantillaComprobante[];
}
