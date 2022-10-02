import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Moneda } from '../interfaces/moneda';
import { environment } from 'src/environments/environment';
import { nombre_servicios } from 'src/shared/config';

@Injectable({
  providedIn: 'root',
})
export class MonedaService {
  constructor(private http: HttpClient) {}

  listarMonedas(): Observable<any> {
    return this.http.get(`${environment.apiURL}/${nombre_servicios.moneda}`);
  }

  listaMonedaPorIdMoneda(id: string) {
    return this.http.get(`${environment.apiURL}/${nombre_servicios.moneda}/${id}`);
  }

  eliminarMoneda(id: string) {
    return this.http.delete(`${environment.apiURL}/${nombre_servicios.moneda}/${id}`);
  }

  agregarMoneda(moneda: Moneda) {
    return this.http.post(`${environment.apiURL}/${nombre_servicios.moneda}`, moneda);
  }

  actualizarMoneda(moneda: Moneda, id: string) {
    return this.http.put(`${environment.apiURL}/${nombre_servicios.moneda}/${id}`, moneda);
  }
}
