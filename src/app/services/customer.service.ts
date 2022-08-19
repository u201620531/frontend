import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Customer } from '../interfaces/customer';

@Injectable({
  providedIn: 'root',
})
export class CustomerService {
  constructor(private http: HttpClient) {}
  route = 'customers';

  getCustomers(): Observable<any> {
    return this.http.get(`${environment.apiURL}/${this.route}`);
  }

  getCustomerById(id: string) {
    return this.http.get(`${environment.apiURL}/${this.route}/${id}`);
  }

  deleteCustomer(id: string) {
    return this.http.delete(`${environment.apiURL}/${this.route}/${id}`);
  }

  addCustomer(Customer: Customer) {
    return this.http.post(`${environment.apiURL}/${this.route}`, Customer);
  }

  editCustomer(Customer: Customer, id: string) {
    return this.http.put(`${environment.apiURL}/${this.route}/${id}`, Customer);
  }
}
