import { DocumentType } from './document-type';

export interface Customer {
  id: string;
  customerType: string; //N-Natural, J-Jurídico
  documentType: DocumentType;
  documentNumber: string;
  businessName: string;
  comercialName?: string;
  address?: string;
  fiscalAddress?: string;
  status: string; //A-Activo, I-Inactivo
  creationDate: string;
  creationUser: string;
}
