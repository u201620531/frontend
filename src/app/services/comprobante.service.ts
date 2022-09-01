import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Comprobante } from '../interfaces/comprobante';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ComprobanteService {

  constructor(private http: HttpClient) {}

  listarComprobante(): Observable<any> {
    return this.http.get(`${environment.apiURL}/comprobantes`);
  }

  listarComprobantePorId(idComprobante: string) {
    return this.http.get(`${environment.apiURL}/comprobantes/${idComprobante}`);
  }

  eliminarComprobante(idComprobante: string) {
    return this.http.delete(`${environment.apiURL}/comprobantes/${idComprobante}`);
  }

  agregarComprobante(comprobante: Comprobante) {
    return this.http.post(`${environment.apiURL}/comprobantes`, comprobante);
  }

  actualizarComprobante(comprobante: Comprobante, idComprobante: string) {
    return this.http.put(`${environment.apiURL}/comprobantes/${idComprobante}`, comprobante);
  }}
