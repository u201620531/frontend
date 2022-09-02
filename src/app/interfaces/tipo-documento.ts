export interface TipoDocumento {
  idTipoDocumento: string;
  descripcion: string;
  abreviatura?: string;
  estado: string; //A-Activo, I-Inactivo
  fechaCreacion: string;
  usuarioCreacion?: string;
}
