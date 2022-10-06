import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { nombre_servicios } from 'src/shared/config';
import { Usuario } from '../interfaces/usuario';

@Injectable({
  providedIn: 'root',
})
export class UsuarioService {
  private currentUsuarioSubject: BehaviorSubject<Usuario>;
  public currentUsuario: Observable<Usuario>;
  usuario: Usuario = {
    idEmpleado: '',
    codigoUsuario: '',
    contrasena: '',
    idPerfilUsuario: '',
    estado: '',
    fechaCreacion: '',
    usuarioCreacion: '',
  };
  errorAutenticacion: any;

  constructor(private http: HttpClient) {
    const data = JSON.parse(
      localStorage.getItem('currentUsuario') || '{"idEmpleado": ""}'
    );
    if (data) {
      this.usuario = {
        idEmpleado: data.idEmpleado,
        codigoUsuario: data.codigoUsuario,
        contrasena: '',
        idPerfilUsuario: '',
        estado: '',
        fechaCreacion: '',
        usuarioCreacion: '',
      };
    }
    this.currentUsuarioSubject = new BehaviorSubject<Usuario>(this.usuario);
    this.currentUsuario = this.currentUsuarioSubject.asObservable();
  }

  public get currentUsuarioValue(): Usuario {
    return this.currentUsuarioSubject.value;
  }

  listarUsuarios(): Observable<any> {
    return this.http.get(`${environment.apiURL}/${nombre_servicios.usuario}`);
  }

  async listarUsuarioPorCodigoUsuarioyContrasena(
    codigoUsuario: string,
    contrasena: string
  ) {
    this.errorAutenticacion = {};
    await this.autenticacion(codigoUsuario, contrasena);
    if (this.errorAutenticacion.text!== undefined) {
      return this.errorAutenticacion;
    } else {
      localStorage.setItem('currentUsuario', JSON.stringify(this.usuario));
      this.currentUsuarioSubject.next(this.usuario);
      return this.usuario;
    }
  }

  listarUsuarioPoridEmpleadoycodigoUsuario(
    idEmpleado: string,
    codigoUsuario: string
  ) {
    return this.http.get(
      `${environment.apiURL}/${nombre_servicios.usuario}/${idEmpleado}/${codigoUsuario}`
    );
  }

  private async autenticacion(codigoUsuario: string, contrasena: string) {
    try {
      const response = await this.http
        .get<any>(
          `${environment.apiURL}/${nombre_servicios.usuario}/${codigoUsuario}/${contrasena}`
        )
        .toPromise();
      if (response === undefined) this.errorAutenticacion = response;
      else this.usuario = response;
    } catch (error) {
      return error;
    }
  }

  logout() {
    this.usuario = {
      idEmpleado: '',
      codigoUsuario: '',
      contrasena: '',
      idPerfilUsuario: '',
      estado: '',
      fechaCreacion: '',
      usuarioCreacion: '',
    };

    localStorage.removeItem('currentUsuario');
    this.currentUsuarioSubject.next(this.usuario);
  }

  eliminarUsuario(idEmpleado: string, codigoUsuario: string) {
    return this.http.delete(
      `${environment.apiURL}/${nombre_servicios.usuario}/${idEmpleado}/${codigoUsuario}`
    );
  }

  agregarUsuario(usuario: Usuario) {
    return this.http.post(
      `${environment.apiURL}/${nombre_servicios.usuario}`,
      usuario
    );
  }

  actualizarUsuario(usuario: Usuario) {
    return this.http.put(
      `${environment.apiURL}/${nombre_servicios.usuario}`,
      usuario
    );
  }
}
