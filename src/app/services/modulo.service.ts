import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { nombre_servicios } from 'src/shared/config';
import { Modulo } from '../interfaces/modulo';

@Injectable({
  providedIn: 'root',
})
export class ModuloService {
  constructor(private http: HttpClient) {}
  route = nombre_servicios.modulo;

  listarModulos(): Observable<any> {
    return this.http.get(`${environment.apiURL}/${this.route}`);
  }

  listarModuloPorIdModulo(idModulo: string) {
    return this.http.get(`${environment.apiURL}/${this.route}/${idModulo}`);
  }

  listarModulosPorIdPerfilUsuario(idPerfilUsuario: string, estado: string) {
    return this.http.get(
      `${environment.apiURL}/${this.route}/${idPerfilUsuario}/${estado}`
    );
  }

  eliminarModulo(idModulo: string) {
    return this.http.delete(`${environment.apiURL}/${this.route}/${idModulo}`);
  }

  agregarModulo(modulo: Modulo) {
    return this.http.post(`${environment.apiURL}/${this.route}`, modulo);
  }

  actualizarModulo(modulo: Modulo, idModulo: string) {
    return this.http.put(
      `${environment.apiURL}/${this.route}/${idModulo}`,
      modulo
    );
  }
}
