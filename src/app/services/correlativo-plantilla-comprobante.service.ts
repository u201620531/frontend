import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CorrelativoPlantillaComprobante } from '../interfaces/correlativo-plantilla-comprobante';
import { environment } from 'src/environments/environment';
import { nombre_servicios } from 'src/shared/config';

@Injectable({
  providedIn: 'root',
})
export class CorrelativocorrelativoPlantillaComprobanteService {
  constructor(private http: HttpClient) {}

  listarCorrelativoPlantillaComprobante(): Observable<any> {
    return this.http.get(
      `${environment.apiURL}/${nombre_servicios.correlativoPlantilla}`
    );
  }

  listarCorrelativoPlantillaComprobantePorAnoyMes(ano: number, mes: number) {
    return this.http.get(
      `${environment.apiURL}/${nombre_servicios.correlativoPlantilla}/${ano}/${mes}`
    );
  }

  eliminarCorrelativoPlantillaComprobante(ano: number, mes: number) {
    return this.http.delete(
      `${environment.apiURL}/${nombre_servicios.correlativoPlantilla}/${ano}/${mes}`
    );
  }

  agregarCorrelativoPlantillaComprobante(
    correlativoPlantillaComprobante: CorrelativoPlantillaComprobante
  ) {
    return this.http.post(
      `${environment.apiURL}/${nombre_servicios.correlativoPlantilla}`,
      correlativoPlantillaComprobante
    );
  }

  actualizarCorrelativoPlantillaComprobante(
    correlativoPlantillaComprobante: CorrelativoPlantillaComprobante,
    ano: number,
    mes: number
  ) {
    return this.http.put(
      `${environment.apiURL}/${nombre_servicios.correlativoPlantilla}/${ano}/${mes}`,
      correlativoPlantillaComprobante
    );
  }
}
