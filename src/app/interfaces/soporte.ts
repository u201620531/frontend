export interface Soporte {
  idSoporte: string;
  nombre: string;
  valor: string;
  descripcion: string;
  abreviatura?: string;
  estado: string; //A-Activo, I-Inactivo
  fechaCreacion: string;
  usuarioCreacion?: string;
}