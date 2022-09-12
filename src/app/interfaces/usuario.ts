export interface Usuario {
  idEmpleado: string;
  codigoUsuario: string;
  contrasena:string;
  idPerfilUsuario:string;
  estado: string; //A-Activo, I-Inactivo
  fechaCreacion: string;
  usuarioCreacion?: string;
  token?: string;
}
