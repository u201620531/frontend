export interface Moneda {
  idMoneda: string;
  descripcion: string;
  signo?: string;
  estado: string; //A-Activo, I-Inactivo
  fechaCreacion: string;
  usuarioCreacion: string;
}
