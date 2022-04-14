import { Injectable } from '@angular/core';
import { FormatType } from '../interfaces/format-type';

@Injectable({
  providedIn: 'root',
})
export class FormatTypeService {
  listFormatTypes: FormatType[] = [
    {
      Id: 'PDF',
      Description: 'Documento PDF',
      Abbreviation: '',
      Type: ['R'],
      State: 'A',
    },
    {
      Id: 'XML',
      Description: 'Documento XML',
      Abbreviation: '',
      Type: ['R', 'V', 'C'],
      State: 'A',
    },
  ];

  constructor() {}

  getFormatTypes() {
    return this.listFormatTypes.slice();
  }

  getFormatTypeById(id: string) {
    return this.listFormatTypes.filter((d) => d.Id === id);
  }

  deleteFormatType(index: number) {
    this.listFormatTypes.splice(index, 1);
  }

  addFormatType(FormatType: FormatType) {
    this.listFormatTypes.unshift(FormatType);
  }
}
