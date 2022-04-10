import { Injectable } from '@angular/core';
import { WayPay } from '../interfaces/way-pay';

@Injectable({
  providedIn: 'root'
})
export class WayPayService {
  listWayPay: WayPay[] = [
    { Id: 'CON', Description: 'Contado' },
    { Id: 'CRE', Description: 'Crédito' }
  ];

  constructor() {}

  getWayPays() {
    return this.listWayPay.slice();
  }
}
