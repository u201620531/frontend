import { Injectable } from '@angular/core';
import { DocumentType } from '../interfaces/document-type';

@Injectable({
  providedIn: 'root',
})
export class DocumentTypeService {
  listDocumentTypes: DocumentType[] = [
    { Id: 'FAC', Description: 'Factura', Abbreviation: '', Type: 'R', State: '' },
    { Id: 'BOL', Description: 'Boleta', Abbreviation: '', Type: 'R', State: '' },
    { Id: 'NDC', Description: 'Nota de crédito', Abbreviation: '', Type: 'R', State: '' },
    { Id: 'DNI', Description: 'Documento Nacional de Identidad', Abbreviation: '', Type: 'R', State: '' },
  ];

  constructor() {}

  getDocumentTypes() {
    return this.listDocumentTypes.slice();
  }

  getDocumentTypeById(id: string) {
    return this.listDocumentTypes.filter(d => d.Id === id);
  }

  deleteDocumentType(index: number) {
    this.listDocumentTypes.splice(index, 1);
  }

  addDocumentType(documentType: DocumentType) {
    this.listDocumentTypes.unshift(documentType);
  }
}
