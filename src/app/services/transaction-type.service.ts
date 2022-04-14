import { Injectable } from '@angular/core';
import { TransactionType } from '../interfaces/transaction-type';

@Injectable({
  providedIn: 'root',
})
export class TransactionTypeService {
  listTransactionTypes: TransactionType[] = [
    {
      Id: 'COM',
      Description: 'Compra',
      Abbreviation: '',
      Type: ['R', 'C'],
      State: 'A',
    },
    {
      Id: 'VEN',
      Description: 'Venta',
      Abbreviation: 'VEN',
      Type: ['R', 'V'],
      State: 'I',
    },
  ];

  constructor() {}

  getTransactionTypes() {
    return this.listTransactionTypes.slice();
  }

  getReportTransactionTypes() {
    const list = this.getTransactionTypes();
    let listReport: TransactionType[] = [];
    for (var transactionType of list) {
      if (transactionType.Type != undefined) {
        for (var item of transactionType.Type) {
          if (item === 'R') listReport.push(transactionType);
        }
      }
    }
    return listReport;
  }

  getTransactionTypeById(id: string) {
    return this.listTransactionTypes.filter((d) => d.Id === id);
  }

  deleteTransactionType(index: number) {
    this.listTransactionTypes.splice(index, 1);
  }

  addTransactionType(TransactionType: TransactionType) {
    this.listTransactionTypes.unshift(TransactionType);
  }
}
