import { Injectable } from '@angular/core';
import { FormatType } from '../interfaces/format-type';

@Injectable({
  providedIn: 'root'
})
export class FormatTypeService {
  listFormatType: FormatType[] = [
    { Id: 'PDF', Description: 'Documento PDF' },
    { Id: 'XML', Description: 'Documento XML' },
  ];

  constructor() {}

  getFormatTypes() {
    return this.listFormatType.slice();
  }
}
