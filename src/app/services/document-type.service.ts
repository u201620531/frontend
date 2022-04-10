import { Injectable } from '@angular/core';
import { DocumentType } from '../interfaces/document-type';
import { ElectronicDocuments } from '../interfaces/electronic-documents';

@Injectable({
  providedIn: 'root',
})
export class DocumentTypeService {
  listDocumentType: DocumentType[] = [
    { Id: 'FAC', Description: 'Factura' },
    { Id: 'BOL', Description: 'Boleta' },
    { Id: 'NDC', Description: 'Nota de crédito' },
  ];

  constructor() {}

  getDocumentTypes() {
    return this.listDocumentType.slice();
  }
}
