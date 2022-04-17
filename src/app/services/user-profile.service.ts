import { Injectable } from '@angular/core';
import { UserProfile } from '../interfaces/user-profile';

@Injectable({
  providedIn: 'root',
})
export class UserProfileService {
  listUserProfiles: UserProfile[] = [
    { Id: 'ADMIN', Description: 'Administrador', State: 'A' },
    { Id: 'ASICON', Description: 'Asistente contable', State: 'A' },
    { Id: 'GESCON', Description: 'Gestor contable', State: 'I' },
  ];

  constructor() {}

  getUserProfiles() {
    return this.listUserProfiles.slice();
  }

  getUserProfileById(id: string) {
    return this.listUserProfiles.filter((d) => d.Id === id);
  }

  deleteUserProfile(index: number) {
    this.listUserProfiles.splice(index, 1);
  }

  addUserProfile(UserProfile: UserProfile) {
    this.listUserProfiles.unshift(UserProfile);
  }
}
