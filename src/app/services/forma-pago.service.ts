import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { FormaPago } from '../interfaces/forma-pago';
import { environment } from 'src/environments/environment';
import { nombre_servicios } from 'src/shared/config';

@Injectable({
  providedIn: 'root',
})
export class FormaPagoService {
  constructor(private http: HttpClient) {}
  route = nombre_servicios.formaPago;

  listarFormaPago(): Observable<any> {
    return this.http.get(`${environment.apiURL}/${this.route}`);
  }

  listarFormaPagoPorId(idFormaPago: string) {
    return this.http.get(`${environment.apiURL}/${this.route}/${idFormaPago}`);
  }

  eliminarFormaPago(idFormaPago: string) {
    return this.http.delete(`${environment.apiURL}/${this.route}/${idFormaPago}`);
  }

  agregarFormaPago(formaPago: FormaPago) {
    return this.http.post(`${environment.apiURL}/${this.route}`, formaPago);
  }

  actualizarFormaPago(formaPago: FormaPago, idFormaPago: string) {
    return this.http.put(`${environment.apiURL}/${this.route}/${idFormaPago}`, formaPago);
  }
}
