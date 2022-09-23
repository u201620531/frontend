import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { TipoDocumento } from '../interfaces/tipo-documento';

@Injectable({
  providedIn: 'root',
})
export class TipoDocumentoService {
  constructor(private http: HttpClient) {}
  route = 'tipodocumentos';

  listarTipoDocumento(): Observable<any> {
    return this.http.get(`${environment.apiURL}/${this.route}`);
  }

  listarTipoDocumentoPorId(idTipoDocumento: string) {
    return this.http.get(
      `${environment.apiURL}/${this.route}/${idTipoDocumento}`
    );
  }

  listarTipoDocumentoPorDescripcion(idTipoDocumento: string, estado: string) {
    return this.http.get(
      `${environment.apiURL}/${this.route}/${idTipoDocumento}/${estado}`
    );
  }

  eliminarTipoDocumento(idTipoDocumento: string) {
    return this.http.delete(
      `${environment.apiURL}/${this.route}/${idTipoDocumento}`
    );
  }

  agegarTipoDocumento(tipoDocumento: TipoDocumento) {
    return this.http.post(`${environment.apiURL}/${this.route}`, tipoDocumento);
  }

  actualizarTipoDocumento(
    tipoDocumento: TipoDocumento,
    idTipoDocumento: string
  ) {
    return this.http.put(
      `${environment.apiURL}/${this.route}/${idTipoDocumento}`,
      tipoDocumento
    );
  }
}
