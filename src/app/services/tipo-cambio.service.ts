import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TipoCambio } from '../interfaces/tipo-cambio';
import { environment } from 'src/environments/environment';
import { nombre_servicios } from 'src/shared/config';

@Injectable({
  providedIn: 'root',
})
export class TipoCambioService {
  constructor(private http: HttpClient) {}

  listarTiposCambio(): Observable<any> {
    return this.http.get(
      `${environment.apiURL}/${nombre_servicios.tipoCambio}`
    );
  }

  listaTipoCambioPorfecha(fecha: string) {
    return this.http.get(
      `${environment.apiURL}/${nombre_servicios.tipoCambio}/${fecha}`
    );
  }

  eliminarTipoCambio(fecha: string) {
    return this.http.delete(
      `${environment.apiURL}/${nombre_servicios.tipoCambio}/${fecha}`
    );
  }

  agregarTipoCambio(TipoCambio: TipoCambio) {
    return this.http.post(
      `${environment.apiURL}/${nombre_servicios.tipoCambio}`,
      TipoCambio
    );
  }

  actualizarTipoCambio(TipoCambio: TipoCambio, fecha: string) {
    return this.http.put(
      `${environment.apiURL}/${nombre_servicios.tipoCambio}/${fecha}`,
      TipoCambio
    );
  }
}
