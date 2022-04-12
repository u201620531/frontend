import { Injectable } from '@angular/core';
import { DocumentType } from '../interfaces/document-type';

@Injectable({
  providedIn: 'root',
})
export class DocumentTypeService {
  listDocumentType: DocumentType[] = [
    { Id: 'FAC', Description: 'Factura' },
    { Id: 'BOL', Description: 'Boleta' },
    { Id: 'NDC', Description: 'Nota de crédito' },
    { Id: 'DNI', Description: 'Documento Nacional de Identidad' },
  ];

  constructor() {}

  getDocumentTypes() {
    return this.listDocumentType.slice();
  }
}
