import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Producto } from '../interfaces/producto';
import { environment } from 'src/environments/environment';
import { nombre_servicios } from 'src/shared/config';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  constructor(private http: HttpClient) {}

  listarProductos(): Observable<any> {
    return this.http.get(`${environment.apiURL}/${nombre_servicios.producto}`);
  }

  listarProductoPorId(id: string) {
    return this.http.get(`${environment.apiURL}/${nombre_servicios.producto}/${id}`);
  }

  eliminarProducto(id: string) {
    return this.http.delete(`${environment.apiURL}/${nombre_servicios.producto}/${id}`);
  }

  agregarProducto(producto: Producto) {
    return this.http.post(`${environment.apiURL}/${nombre_servicios.producto}`, producto);
  }

  actualizarProducto(producto: Producto, id: string) {
    return this.http.put(`${environment.apiURL}/${nombre_servicios.producto}/${id}`, producto);
  }}
