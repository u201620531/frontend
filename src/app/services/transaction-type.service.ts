import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TransactionType } from '../interfaces/transaction-type';

@Injectable({
  providedIn: 'root',
})
export class TransactionTypeService {
  baseURL: string = 'http://localhost:3000/api';

  constructor(private http: HttpClient) {}

  getTransactionTypes(): Observable<any> {
    return this.http.get(`${this.baseURL}/transactiontypes`);
  }

  getReportTransactionTypes() {
    const list = this.getTransactionTypes();
    let listReport: TransactionType[] = [];

    list.subscribe({
      next: (value) => console.log(value),
    });

    // for (var transactionType of list) {
    //   if (transactionType.Type != undefined) {
    //     for (var item of transactionType.Type) {
    //       if (item === 'R') listReport.push(transactionType);
    //     }
    //   }
    // }
    return listReport;
  }

  getTransactionTypeById(id: string) {
    return this.http.get(`${this.baseURL}/transactiontypes/${id}`);
  }

  deleteTransactionType(id: string) {
    return this.http.delete(`${this.baseURL}/formattypes/${id}`);
  }

  addTransactionType(transactionType: TransactionType) {
    return this.http.post(`${this.baseURL}/transactiontypes`, transactionType);
  }

  editTransactionType(transactionType: TransactionType, id: string) {
    return this.http.put(
      `${this.baseURL}/transactiontypes/${id}`,
      transactionType
    );
  }
}
