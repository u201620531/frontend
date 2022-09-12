export interface Empleado {
  idEmpleado: string;
  idCargo: string;
  nombre: string;
  apellido: string;
  direccion?: string;
  telefono?: string;
  email1: string;
  email2?: string;
  fechaNacimiento:string;
  estado: string; //A-Activo, I-Inactivo
  fechaCreacion: string;
  usuarioCreacion?: string;
}
