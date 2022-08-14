import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { DocumentType } from '../interfaces/document-type';

@Injectable({
  providedIn: 'root',
})
export class DocumentTypeService {
  constructor(private http:HttpClient) {}
  route='documenttypes';

  getDocumentTypes():Observable<any> {
    return this.http.get(`${environment.apiURL}/${this.route}`);
  }

  getDocumentTypeById(id: string) {
    return this.http.get(`${environment.apiURL}/${this.route}/${id}`);
  }

  deleteDocumentType(id: string) {
    this.http.delete(`${environment.apiURL}/${this.route}/${id}`);
  }

  addDocumentType(documentType: DocumentType) {
    return this.http.post(`${environment.apiURL}/${this.route}`, documentType);
  }

  editDocumentType(documentType: DocumentType) {
    return this.http.put(`${environment.apiURL}/${this.route}`, documentType);
  }
}
