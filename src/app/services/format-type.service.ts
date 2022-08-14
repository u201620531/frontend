import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { FormatType } from '../interfaces/format-type';

@Injectable({
  providedIn: 'root',
})
export class FormatTypeService {
  baseURL: string = 'http://localhost:3000/api';

  constructor(private http: HttpClient) {}

  getFormatTypes(): Observable<any> {
    return this.http.get(`${this.baseURL}/formattypes`);
  }

  getFormatTypeById(id: string) {
    return this.http.get(`${this.baseURL}/formattypes/${id}`);
  }

  deleteFormatType(id: string) {
    this.http.delete(`${this.baseURL}/formattypes/${id}`);
  }

  addFormatType(formatType: FormatType) {
    return this.http.post(`${this.baseURL}/formattypes`, formatType);
  }

  editFormatType(formatType: FormatType) {
    return this.http.put(`${this.baseURL}/formattypes`, formatType);
  }
}
