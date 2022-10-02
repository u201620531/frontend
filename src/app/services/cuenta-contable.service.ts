import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CuentaContable } from '../interfaces/cuenta-contable';
import { environment } from 'src/environments/environment';
import { nombre_servicios } from 'src/shared/config';

@Injectable({
  providedIn: 'root',
})
export class CuentaContableService {
  constructor(private http: HttpClient) {}

  listarCuentasContables(): Observable<any> {
    return this.http.get(
      `${environment.apiURL}/${nombre_servicios.cuentaContable}`
    );
  }

  listaCuentaContablePorIdCuentaContable(idCuentaContable: string) {
    return this.http.get(
      `${environment.apiURL}/${nombre_servicios.cuentaContable}/${idCuentaContable}`
    );
  }

  eliminarCuentaContable(idCuentaContable: string) {
    return this.http.delete(
      `${environment.apiURL}/${nombre_servicios.cuentaContable}/${idCuentaContable}`
    );
  }

  agregarCuentaContable(cuentaContable: CuentaContable) {
    return this.http.post(
      `${environment.apiURL}/${nombre_servicios.cuentaContable}`,
      cuentaContable
    );
  }

  actualizarCuentaContable(
    cuentaContable: CuentaContable,
    idCuentaContable: string
  ) {
    return this.http.put(
      `${environment.apiURL}/${nombre_servicios.cuentaContable}/${idCuentaContable}`,
      cuentaContable
    );
  }
}
