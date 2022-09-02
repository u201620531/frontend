import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { FormaPago } from '../interfaces/forma-pago';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class FormaPagoService {
  constructor(private http: HttpClient) {}

  listarFormaPago(): Observable<any> {
    return this.http.get(`${environment.apiURL}/formapagos`);
  }

  listarFormaPagoPorId(idFormaPago: string) {
    return this.http.get(`${environment.apiURL}/formapagos/${idFormaPago}`);
  }

  eliminarFormaPago(idFormaPago: string) {
    return this.http.delete(`${environment.apiURL}/formapagos/${idFormaPago}`);
  }

  agregarFormaPago(formaPago: FormaPago) {
    return this.http.post(`${environment.apiURL}/formapagos`, formaPago);
  }

  actualizarFormaPago(formaPago: FormaPago, idFormaPago: string) {
    return this.http.put(`${environment.apiURL}/formapagos/${idFormaPago}`, formaPago);
  }
}
