import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Moneda } from '../interfaces/moneda';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class MonedaService {
  constructor(private http: HttpClient) {}

  listarMonedas(): Observable<any> {
    return this.http.get(`${environment.apiURL}/monedas`);
  }

  listaMonedaPorId(id: string) {
    return this.http.get(`${environment.apiURL}/monedas/${id}`);
  }

  eliminarMoneda(id: string) {
    return this.http.delete(`${environment.apiURL}/monedas/${id}`);
  }

  agregarMoneda(moneda: Moneda) {
    return this.http.post(`${environment.apiURL}/monedas`, moneda);
  }

  actualizarMoneda(moneda: Moneda, id: string) {
    return this.http.put(`${environment.apiURL}/monedas/${id}`, moneda);
  }
}
