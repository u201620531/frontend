import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Proveedor } from '../interfaces/proveedor';

@Injectable({
  providedIn: 'root',
})
export class ProveedorService {
  constructor(private http: HttpClient) {}
  route = 'proveedores';

  listarPoveedores(): Observable<any> {
    return this.http.get(`${environment.apiURL}/${this.route}`);
  }

  listarProveedorPoridProveedor(idProveedor: string) {
    return this.http.get(`${environment.apiURL}/${this.route}/${idProveedor}`);
  }

  eliminarProveedor(idProveedor: string) {
    return this.http.delete(
      `${environment.apiURL}/${this.route}/${idProveedor}`
    );
  }

  agregarProveedor(proveedor: Proveedor) {
    return this.http.post(`${environment.apiURL}/${this.route}`, proveedor);
  }

  actualizarProveedor(proveedor: Proveedor, idProveedor: string) {
    return this.http.put(
      `${environment.apiURL}/${this.route}/${idProveedor}`,
      proveedor
    );
  }
}
