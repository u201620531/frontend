import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Comprobante } from '../interfaces/comprobante';
import { environment } from 'src/environments/environment';
import { nombre_servicios } from 'src/shared/config';

@Injectable({
  providedIn: 'root',
})
export class ComprobanteService {
  constructor(private http: HttpClient) {}

  listarComprobante(): Observable<any> {
    return this.http.get(
      `${environment.apiURL}/${nombre_servicios.comprobante}`
    );
  }

  reporteComprobante(
    nroDocumento: string,
    idTipoDocumento: string,
    idFormaPago: string,
    idMoneda: string,
    fechaEmisionIni: string,
    fechaEmisionFin: string
  ): Observable<any> {
    return this.http.get(
      `${environment.apiURL}/${nombre_servicios.comprobante}/${nroDocumento}/${idTipoDocumento}/${idFormaPago}/${idMoneda}/${fechaEmisionIni}/${fechaEmisionFin}`
    );
  }

  listarComprobantePorId(idComprobante: string) {
    return this.http.get(
      `${environment.apiURL}/${nombre_servicios.comprobante}/${idComprobante}`
    );
  }

  eliminarComprobante(idComprobante: string) {
    return this.http.delete(
      `${environment.apiURL}/${nombre_servicios.comprobante}/${idComprobante}`
    );
  }

  agregarComprobante(comprobante: Comprobante) {
    return this.http.post(
      `${environment.apiURL}/${nombre_servicios.comprobante}`,
      comprobante
    );
  }

  agregarComprobanteMasivo(comprobante: Comprobante, numComprobantes: string) {
    return this.http.post(
      `${environment.apiURL}/${nombre_servicios.comprobante}/${numComprobantes}`,
      comprobante
    );
  }

  actualizarComprobante(comprobante: Comprobante, idComprobante: string) {
    return this.http.put(
      `${environment.apiURL}/${nombre_servicios.comprobante}/${idComprobante}`,
      comprobante
    );
  }
}
