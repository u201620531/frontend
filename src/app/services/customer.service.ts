import { Injectable } from '@angular/core';
import { Customer } from '../interfaces/customer';

@Injectable({
  providedIn: 'root',
})
export class CustomerService {
  listCustomers: Customer[] = [
    {
      Id: 'N001',
      CustomerType: 'N',
      DocumentType: {
        Id: 'DNI',
        Description: 'Documento Nacional de Identidad',
      },
      DocumentNumber: '12345678',
      BusinessName: 'Jose Perez',
      ComercialName: 'Jose Perez',
      Address: 'Av. Las Flores 1245-Breña',
      FiscalAddress: 'Av. Las Flores 1245-Breña',
      State: 'Activo',
      CreationDate: '01-03-2022',
      CreationUser: 'JLRE',
    },
    {
      Id: 'N002',
      CustomerType: 'N',
      DocumentType: {
        Id: 'DNI',
        Description: 'Documento Nacional de Identidad',
      },
      DocumentNumber: '45784512',
      BusinessName: 'Rosa Torres',
      ComercialName: 'Rosa Torres',
      Address: 'Av. Gerundios Mz. E Lt. 25 - VES',
      FiscalAddress: 'Av. Gerundios Mz. E Lt. 25 - VES',
      State: 'Inactivo',
      CreationDate: '24-01-2019',
      CreationUser: 'JLRE',
    },
    {
      Id: 'J0001',
      CustomerType: 'J',
      DocumentType: {
        Id: 'RUC',
        Description: 'Registro Unico Contribuyente',
      },
      DocumentNumber: '123456789101',
      BusinessName: 'Andamios SRL',
      ComercialName: 'Andamios SRL',
      Address: 'Jr. Pachitea 10005 - Cercado de Lima',
      FiscalAddress: 'Jr. Pachitea 10005 - Cercado de Lima',
      State: 'Activo',
      CreationDate: '15-04-2022',
      CreationUser: 'JLRE',
    },
  ];

  constructor() {}

  getCustomers() {
    return this.listCustomers.slice();
  }

  deleteCustomer(index: number) {
    this.listCustomers.splice(index, 1);
  }

  addCustomer(customer: Customer) {
    this.listCustomers.unshift(customer);
  }
}
