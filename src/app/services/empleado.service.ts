import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { nombre_servicios } from 'src/shared/config';
import { Empleado } from '../interfaces/empleado';

@Injectable({
  providedIn: 'root',
})
export class EmpleadoService {
  constructor(private http: HttpClient) {}
  route = nombre_servicios.empleado;

  listarEmpleados(): Observable<any> {
    return this.http.get(`${environment.apiURL}/${this.route}`);
  }

  listarEmpleadoPoridEmpleado(idEmpleado: string) {
    return this.http.get(`${environment.apiURL}/${this.route}/${idEmpleado}`);
  }

  eliminarEmpleado(idEmpleado: string) {
    return this.http.delete(
      `${environment.apiURL}/${this.route}/${idEmpleado}`
    );
  }

  agregarEmpleado(empleado: Empleado) {
    return this.http.post(`${environment.apiURL}/${this.route}`, empleado);
  }

  actualizarEmpleado(empleado: Empleado, idEmpleado: string) {
    return this.http.put(
      `${environment.apiURL}/${this.route}/${idEmpleado}`,
      empleado
    );
  }
}
