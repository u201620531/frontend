import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Auditoria } from '../interfaces/auditoria';
import { environment } from 'src/environments/environment';
import { nombre_servicios } from 'src/shared/config';

@Injectable({
  providedIn: 'root',
})
export class AuditoriaService {
  constructor(private http: HttpClient) {}

  listarAditorias(): Observable<any> {
    return this.http.get(`${environment.apiURL}/${nombre_servicios.auditoria}`);
  }

  listaAuditoriaPorfecha(fecha: string) {
    return this.http.get(
      `${environment.apiURL}/${nombre_servicios.auditoria}/${fecha}`
    );
  }

  eliminarAuditoria(fecha: string) {
    return this.http.delete(
      `${environment.apiURL}/${nombre_servicios.auditoria}/${fecha}`
    );
  }

  agregarAuditoria(Auditoria: Auditoria) {
    return this.http.post(
      `${environment.apiURL}/${nombre_servicios.auditoria}`,
      Auditoria
    );
  }

  actualizarAuditoria(Auditoria: Auditoria, fecha: string) {
    return this.http.put(
      `${environment.apiURL}/${nombre_servicios.auditoria}/${fecha}`,
      Auditoria
    );
  }
}
