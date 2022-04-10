import { Injectable } from '@angular/core';
import { Money } from '../interfaces/money';

@Injectable({
  providedIn: 'root'
})
export class MoneyService {
  listMoney: Money[] = [
    { Id: 'SOL', Description: 'Nuevos Soles', Abbreviation: 'S/.' },
    { Id: 'DOL', Description: 'Dólares Americanos', Abbreviation: '$' },
  ];

  constructor() {}

  getMoneys() {
    return this.listMoney.slice();
  }
}
