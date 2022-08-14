import { Injectable } from '@angular/core';
import { Employee } from '../interfaces/employee';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  listEmployees: Employee[] = [
    {
      Id: 'E000001',
      DocumentType: {
        id: 'DNI',
        description: 'Documento Nacional de Identidad',
        status:'A'
      },
      DocumentNumber: '12345678',
      FirstName: 'Jose',
      LastName: 'Perez',
      Address: 'Av. Las Flores 1245-Breña',
      State: 'A',
      CreationDate: '01-03-2022',
      CreationUser: 'JLRE',
    },
    {
      Id: 'E000002',
      DocumentType: {
        id: 'DNI',
        description: 'Documento Nacional de Identidad',
        status:'A'
      },
      DocumentNumber: '45784512',
      FirstName: 'Rosa',
      LastName: 'Torres',
      Address: 'Av. Gerundios Mz. E Lt. 25 - VES',
      State: 'I',
      CreationDate: '24-01-2019',
      CreationUser: 'JLRE',
    },
    {
      Id: 'E0000003',
      DocumentType: {
        id: 'DNI',
        description: 'Documento Nacional de Identidad',
        status:'A'
      },
      DocumentNumber: '123456789101',
      FirstName: 'Ana',
      LastName: 'Aguilar',
      Address: 'Jr. Pachitea 10005 - Cercado de Lima',
      State: 'A',
      CreationDate: '15-04-2022',
      CreationUser: 'JLRE',
    },
  ];

  constructor() {}

  getEmployees() {
    return this.listEmployees.slice();
  }

  getEmployeeById(id: string) {
    return this.listEmployees.find(c => c.Id === id);
  }

  deleteEmployee(index: number) {
    this.listEmployees.splice(index, 1);
  }

  addEmployee(Employee: Employee) {
    this.listEmployees.unshift(Employee);
  }
}
