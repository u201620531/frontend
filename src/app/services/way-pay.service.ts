import { Injectable } from '@angular/core';
import { WayPay } from '../interfaces/way-pay';

@Injectable({
  providedIn: 'root',
})
export class WayPayService {
  listWayPays: WayPay[] = [
    { Id: 'CON', Description: 'Contado', Abbreviation: 'Contado', State: 'A' },
    { Id: 'CRE', Description: 'Crédito', Abbreviation: 'Cred', State: 'A' },
    { Id: 'DIV', Description: 'Diversos', Abbreviation: 'Div', State: 'I' },
  ];

  constructor() {}

  getWayPays() {
    return this.listWayPays.slice();
  }

  getWayPayById(id: string) {
    return this.listWayPays.filter((d) => d.Id === id);
  }

  deleteWayPay(index: number) {
    this.listWayPays.splice(index, 1);
  }

  addWayPay(WayPay: WayPay) {
    this.listWayPays.unshift(WayPay);
  }
}
