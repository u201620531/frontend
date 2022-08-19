import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Supplier } from '../interfaces/supplier';

@Injectable({
  providedIn: 'root',
})
export class SupplierService {
  constructor(private http: HttpClient) {}
  route = 'suppliers';

  getSuppliers(): Observable<any> {
    return this.http.get(`${environment.apiURL}/${this.route}`);
  }

  getSupplierById(id: string) {
    return this.http.get(`${environment.apiURL}/${this.route}/${id}`);
  }

  deleteSupplier(id: string) {
    return this.http.delete(`${environment.apiURL}/${this.route}/${id}`);
  }

  addSupplier(supplier: Supplier) {
    return this.http.post(`${environment.apiURL}/${this.route}`, supplier);
  }

  editSupplier(supplier: Supplier, id: string) {
    return this.http.put(`${environment.apiURL}/${this.route}/${id}`, supplier);
  }
}
