import { DocumentType } from "./document-type";

export interface Employee {
  Id: string;
  DocumentType?: DocumentType;
  DocumentNumber?: string;
  FirstName: string;
  LastName?: string;
  Address?: string;
  State?: string; //A-Activo, I-Inactivo
  CreationDate?: string;
  CreationUser?: string;
}
