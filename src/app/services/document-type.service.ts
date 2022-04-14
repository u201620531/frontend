import { Injectable } from '@angular/core';
import { DocumentType } from '../interfaces/document-type';

@Injectable({
  providedIn: 'root',
})
export class DocumentTypeService {
  listDocumentTypes: DocumentType[] = [
    { Id: 'FAC', Description: 'Factura', Abbreviation: '', Type: ['R', 'V', 'C'], State: 'A' },
    { Id: 'BOL', Description: 'Boleta', Abbreviation: '', Type: ['R', 'V', 'C'], State: 'A' },
    { Id: 'NDC', Description: 'Nota de crédito', Abbreviation: '', Type: ['R', 'V', 'C'], State: 'I' },
    { Id: 'DNI', Description: 'Documento Nacional de Identidad', Abbreviation: '', Type: ['R', 'P'], State: 'A' },
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
