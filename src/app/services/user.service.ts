import { Injectable } from '@angular/core';
import { User } from '../interfaces/user';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  listUsers: User[] = [
    {
      Id: 'U00001',
      Employee: {
        Id: 'E0000001',
        FirstName: 'Jose',
        LastName: 'Perez'
      },
      UserProfile: {
        Id: 'ADMIN',
        Description: 'Administrador',
        State: 'A',
      },
      UserName: 'JOS',
      Password: '123',
      ActivationStartDate: '01-01-2022',
      ActivationEndDate: '31-12-2032',
      State: 'A',
    },
    {
      Id: 'U00002',
      Employee: {
        Id: 'E0000002',
        FirstName: 'Maria',
      },
      UserProfile: {
        Id: 'ADMIN',
        Description: 'Administrador',
        State: 'A',
      },
      UserName: 'MAR',
      Password: '123',
      ActivationStartDate: '01-01-2022',
      ActivationEndDate: '31-12-2032',
      State: 'I',
    },
  ];

  constructor() {}

  getUsers() {
    return this.listUsers.slice();
  }

  getUserById(id: string) {
    return this.listUsers.filter((d) => d.Id === id);
  }

  deleteUser(index: number) {
    this.listUsers.splice(index, 1);
  }

  addUser(User: User) {
    this.listUsers.unshift(User);
  }
}
