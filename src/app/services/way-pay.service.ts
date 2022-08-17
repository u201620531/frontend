import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { WayPay } from '../interfaces/way-pay';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class WayPayService {
  constructor(private http: HttpClient) {}

  getWayPays(): Observable<any> {
    return this.http.get(`${environment.apiURL}/waypays`);
  }

  getWayPayById(id: string) {
    return this.http.get(`${environment.apiURL}/waypays/${id}`);
  }

  deleteWayPay(id: string) {
    return this.http.delete(`${environment.apiURL}/waypays/${id}`);
  }

  addWayPay(wayPay: WayPay) {
    return this.http.post(`${environment.apiURL}/waypays`, wayPay);
  }

  editWayPay(wayPay: WayPay, id: string) {
    return this.http.put(`${environment.apiURL}/waypays/${id}`, wayPay);
  }
}
