import { Injectable } from '@angular/core';
import { TransactionType } from '../interfaces/transaction-type';

@Injectable({
  providedIn: 'root'
})
export class TransactionTypeService {
  listTransactionType: TransactionType[] = [
    { Id: '', Description: 'Todos' , Type: [ { Id: 'T'}]},
    { Id: 'COM', Description: 'Compra', Type: [ { Id: 'R'}, { Id: 'C'}] },
    { Id: 'VEN', Description: 'Venta', Type: [ { Id: 'R'}, { Id: 'V'}] }
  ];

  constructor() {}

  getTransactionTypes() {
    return this.listTransactionType.slice();
  }

  getReportTransactionTypes() {
    const list = this.getTransactionTypes();
    let listReport: TransactionType[] = [];
    for (var transactionType  of list){
      for (var item of transactionType.Type) {
        if (item.Id === "R" || item.Id === "T") listReport.push(transactionType);
      }
    }
    return listReport;
  }
}
