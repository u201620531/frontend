import { Injectable } from '@angular/core';
import { CustomerType } from '../interfaces/customer-type';

@Injectable({
  providedIn: 'root'
})
export class CustomerTypeService {
  listCustomerType: CustomerType[] = [
    { Id: 'N', Description: 'Natural' },
    { Id: 'J', Description: 'Jurídica' },
  ];

  constructor() {}

  getCustomerTypes() {
    return this.listCustomerType.slice();
  }
}
