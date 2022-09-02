import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { nombre_servicios } from 'src/shared/config';
import { Soporte } from '../interfaces/soporte';

@Injectable({
  providedIn: 'root',
})
export class SoporteService {

  constructor(private http:HttpClient) {}

  listarSoportes():Observable<any> {
    return this.http.get(`${environment.apiURL}/${nombre_servicios.soporte}`);
  }

  listarSoporteById(idSoporte: string):Observable<any> {
    return this.http.get(`${environment.apiURL}/${nombre_servicios.soporte}/${idSoporte}`);
  }

  eliminarSoporte(idSoporte: string) {
    this.http.delete(`${environment.apiURL}/${nombre_servicios.soporte}/${idSoporte}`);
  }

  agregarSoporte(soporte: Soporte) {
    return this.http.post(`${environment.apiURL}/${nombre_servicios.soporte}`, soporte);
  }

  actualizarSoporte(soporte: Soporte) {
    return this.http.put(`${environment.apiURL}/${nombre_servicios.soporte}`, soporte);
  }
}
