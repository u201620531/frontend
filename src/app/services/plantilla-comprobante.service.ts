import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PlantillaComprobante } from '../interfaces/plantilla-comprobante';
import { environment } from 'src/environments/environment';
import { nombre_servicios } from 'src/shared/config';

@Injectable({
  providedIn: 'root',
})
export class PlantillaComprobanteService {
  constructor(private http: HttpClient) {}

  listarPlantillaComprobante(): Observable<any> {
    return this.http.get(`${environment.apiURL}/${nombre_servicios.plantilla}`);
  }

  listarPlantillaComprobantePorId(idPlantillaComprobante: string) {
    return this.http.get(
      `${environment.apiURL}/${nombre_servicios.plantilla}/${idPlantillaComprobante}`
    );
  }

  eliminarPlantillaComprobante(idPlantillaComprobante: string) {
    return this.http.delete(
      `${environment.apiURL}/${nombre_servicios.plantilla}/${idPlantillaComprobante}`
    );
  }

  agregarPlantillaComprobante(PlantillaComprobante: PlantillaComprobante) {
    return this.http.post(
      `${environment.apiURL}/${nombre_servicios.plantilla}`,
      PlantillaComprobante
    );
  }

  actualizarPlantillaComprobante(
    plantillaComprobante: PlantillaComprobante,
    idPlantillaComprobante: string
  ) {
    return this.http.put(
      `${environment.apiURL}/${nombre_servicios.plantilla}/${idPlantillaComprobante}`,
      plantillaComprobante
    );
  }
}
