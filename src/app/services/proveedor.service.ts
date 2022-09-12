import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { nombre_servicios } from 'src/shared/config';
import { Proveedor } from '../interfaces/proveedor';

@Injectable({
  providedIn: 'root',
})
export class ProveedorService {
  constructor(private http: HttpClient) {}

  listarPoveedores(): Observable<any> {
    return this.http.get(`${environment.apiURL}/${nombre_servicios.proveedor}`);
  }

  listarProveedorPoridProveedor(idProveedor: string) {
    return this.http.get(`${environment.apiURL}/${nombre_servicios.proveedor}/${idProveedor}`);
  }

  eliminarProveedor(idProveedor: string) {
    return this.http.delete(
      `${environment.apiURL}/${nombre_servicios.proveedor}/${idProveedor}`
    );
  }

  agregarProveedor(proveedor: Proveedor) {
    return this.http.post(`${environment.apiURL}/${nombre_servicios.proveedor}`, proveedor);
  }

  actualizarProveedor(proveedor: Proveedor, idProveedor: string) {
    return this.http.put(
      `${environment.apiURL}/${nombre_servicios.proveedor}/${idProveedor}`,
      proveedor
    );
  }
}
