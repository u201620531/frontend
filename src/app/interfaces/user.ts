import { Employee } from "./employee";
import { UserProfile } from "./user-profile";

export interface User {
  Id: string;
  Employee: Employee;
  UserProfile: UserProfile;
  UserName:string;
  Password: string;
  ActivationStartDate?: string;
  ActivationEndDate?: string;
  State: string; //A-Activo, I-Inactivo
  CreationDate?: string;
  CreationUser?: string;
}
