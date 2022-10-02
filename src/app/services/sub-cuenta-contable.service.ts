import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SubCuentaContable } from '../interfaces/sub-cuenta-contable';
import { environment } from 'src/environments/environment';
import { nombre_servicios } from 'src/shared/config';

@Injectable({
  providedIn: 'root',
})
export class SubCuentaContableService {
  constructor(private http: HttpClient) {}

  listarSubCuentasContables(): Observable<any> {
    return this.http.get(
      `${environment.apiURL}/${nombre_servicios.subCuentaContable}`
    );
  }

  listaSubCuentaContablePorIdSubCuentaContable(
    idCuentaContable: string,
    idSubCuentaContable: string
  ) {
    return this.http.get(
      `${environment.apiURL}/${nombre_servicios.subCuentaContable}/${idCuentaContable}/${idSubCuentaContable}`
    );
  }

  eliminarSubCuentaContable(
    idCuentaContable: string,
    idSubCuentaContable: string
  ) {
    return this.http.delete(
      `${environment.apiURL}/${nombre_servicios.subCuentaContable}/${idCuentaContable}/${idSubCuentaContable}`
    );
  }

  agregarSubCuentaContable(
    SubCuentaContable: SubCuentaContable
  ) {
    return this.http.post(
      `${environment.apiURL}/${nombre_servicios.subCuentaContable}`,
      SubCuentaContable
    );
  }

  actualizarSubCuentaContable(
    SubCuentaContable: SubCuentaContable,
    idCuentaContable: string,
    idSubCuentaContable: string
  ) {
    return this.http.put(
      `${environment.apiURL}/${nombre_servicios.subCuentaContable}/${idCuentaContable}/${idSubCuentaContable}`,
      SubCuentaContable
    );
  }
}
