import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DetallePlantillaComprobante } from '../interfaces/detalle-plantilla-comprobante';
import { environment } from 'src/environments/environment';
import { nombre_servicios } from 'src/shared/config';

@Injectable({
  providedIn: 'root',
})
export class DetallePlantillaComprobanteService {
  constructor(private http: HttpClient) {}

  listarDetallePlantillaComprobante(
    idPlantillaComprobante: string
  ): Observable<any> {
    return this.http.get(
      `${environment.apiURL}/${nombre_servicios.detallePlantilla}/${idPlantillaComprobante}`
    );
  }

  listarDetallePlantillaComprobantePorId(
    idPlantillaComprobante: string,
    idComprobante: string
  ) {
    return this.http.get(
      `${environment.apiURL}/${nombre_servicios.detallePlantilla}/${idPlantillaComprobante}/${idComprobante}`
    );
  }

  eliminarDetallePlantillaComprobante(
    idPlantillaComprobante: string,
    idComprobante: string
  ) {
    return this.http.delete(
      `${environment.apiURL}/${nombre_servicios.detallePlantilla}/${idPlantillaComprobante}/${idComprobante}`
    );
  }

  eliminarDetallePlantillaComprobanteMasivo(idPlantillaComprobante: string) {
    return this.http.delete(
      `${environment.apiURL}/${nombre_servicios.detallePlantilla}/${idPlantillaComprobante}`
    );
  }

  agregarDetallePlantillaComprobante(
    detallePlantillaComprobante: DetallePlantillaComprobante
  ) {
    return this.http.post(
      `${environment.apiURL}/${nombre_servicios.detallePlantilla}`,
      detallePlantillaComprobante
    );
  }

  actualizarDetallePlantillaComprobante(
    detallePlantillaComprobante: DetallePlantillaComprobante,
    idPlantillaComprobante: string,
    idComprobante: string
  ) {
    return this.http.put(
      `${environment.apiURL}/${nombre_servicios.detallePlantilla}/${idPlantillaComprobante}/${idComprobante}`,
      detallePlantillaComprobante
    );
  }

  actualizarDetallePlantillaComprobanteMasivo(
    detallePlantillaComprobante: DetallePlantillaComprobante,
    idPlantillaComprobante: string
  ) {
    return this.http.put(
      `${environment.apiURL}/${nombre_servicios.detallePlantilla}/${idPlantillaComprobante}`,
      detallePlantillaComprobante
    );
  }
}
