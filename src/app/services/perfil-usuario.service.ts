import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PerfilUsuario } from '../interfaces/perfil-usuario';
import { environment } from 'src/environments/environment';
import { nombre_servicios } from 'src/shared/config';

@Injectable({
  providedIn: 'root',
})
export class PerfilUsuarioService {
  constructor(private http: HttpClient) {}

  listarPerfilesUsuario(): Observable<any> {
    return this.http.get(`${environment.apiURL}/${nombre_servicios.perfilUsuario}`);
  }

  listaPerfilUsuarioPoridPerfilUsuario(idPerfilUsuario: string) {
    return this.http.get(`${environment.apiURL}/${nombre_servicios.perfilUsuario}/${idPerfilUsuario}`);
  }

  eliminarPerfilUsuario(idPerfilUsuario: string) {
    return this.http.delete(`${environment.apiURL}/${nombre_servicios.perfilUsuario}/${idPerfilUsuario}`);
  }

  agregarPerfilUsuario(perfilUsuario: PerfilUsuario) {
    return this.http.post(`${environment.apiURL}/${nombre_servicios.perfilUsuario}`, perfilUsuario);
  }

  actualizarPerfilUsuario(perfilUsuario: PerfilUsuario, idPerfilUsuario: string) {
    return this.http.put(`${environment.apiURL}/${nombre_servicios.perfilUsuario}/${idPerfilUsuario}`, perfilUsuario);
  }
}
