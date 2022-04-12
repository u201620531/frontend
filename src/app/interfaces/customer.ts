import { DocumentType } from './document-type';

export interface Customer {
  Id: string;
  CustomerType: string; //N-Natural, J-Jurídico
  DocumentType: DocumentType;
  DocumentNumber: string;
  BusinessName: string;
  ComercialName?: string;
  Address?: string;
  FiscalAddress?: string;
  State: string; //A-Activo, I-Inactivo
  CreationDate: string;
  CreationUser: string;
}