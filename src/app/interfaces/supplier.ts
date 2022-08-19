import { DocumentType } from './document-type';

export interface Supplier {
  id: string;
  supplierType: string; //N-Natural, J-Jurídico
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
