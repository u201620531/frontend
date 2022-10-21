import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { nombre_servicios } from 'src/shared/config';
import { TipoDocumento } from '../interfaces/tipo-documento';

@Injectable({
  providedIn: 'root',
})
export class TipoDocumentoService {
  constructor(private http: HttpClient) {}

  listarTipoDocumento(): Observable<any> {
    return this.http.get(`${environment.apiURL}/${nombre_servicios.tipoDocumento}`);
  }

  listarTipoDocumentoPorId(idTipoDocumento: string) {
    return this.http.get(
      `${environment.apiURL}/${nombre_servicios.tipoDocumento}/${idTipoDocumento}`
    );
  }

  listarTipoDocumentoPorDescripcion(idTipoDocumento: string, estado: string) {
    return this.http.get(
      `${environment.apiURL}/${nombre_servicios.tipoDocumento}/${idTipoDocumento}/${estado}`
    );
  }

  eliminarTipoDocumento(idTipoDocumento: string) {
    return this.http.delete(
      `${environment.apiURL}/${nombre_servicios.tipoDocumento}/${idTipoDocumento}`
    );
  }

  agregarTipoDocumento(tipoDocumento: TipoDocumento) {
    return this.http.post(`${environment.apiURL}/${nombre_servicios.tipoDocumento}`, tipoDocumento);
  }

  actualizarTipoDocumento(
    tipoDocumento: TipoDocumento,
    idTipoDocumento: string
  ) {
    return this.http.put(
      `${environment.apiURL}/${nombre_servicios.tipoDocumento}/${idTipoDocumento}`,
      tipoDocumento
    );
  }
}
