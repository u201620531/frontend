import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Money } from '../interfaces/money';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class MoneyService {
  constructor(private http: HttpClient) {}

  getMoneys(): Observable<any> {
    return this.http.get(`${environment.apiURL}/moneys`);
  }

  getMoneyById(id: string) {
    return this.http.get(`${environment.apiURL}/moneys/${id}`);
  }

  deleteMoney(id: string) {
    return this.http.delete(`${environment.apiURL}/moneys/${id}`);
  }

  addMoney(money: Money) {
    return this.http.post(`${environment.apiURL}/moneys`, money);
  }

  editMoney(money: Money, id: string) {
    return this.http.put(`${environment.apiURL}/moneys/${id}`, money);
  }
}
