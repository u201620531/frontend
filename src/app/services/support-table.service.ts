import { Injectable } from '@angular/core';
import { SupportTable } from '../interfaces/support-table';

@Injectable({
  providedIn: 'root',
})
export class SupportTableService {
  listSupportTables: SupportTable[] = [
    { Id: 'TTD', Name: 'Tipo de Documento', Value: 'C', Description: 'Compra' },
    {
      Id: 'TTD',
      Name: 'Tipo de Documento',
      Value: 'R',
      Description: 'Reporte',
    },
    { Id: 'TTD', Name: 'Tipo de Documento', Value: 'V', Description: 'Venta' },
    {
      Id: 'TFD',
      Name: 'Tipo formato de Documento',
      Value: 'XLS',
      Description: 'Excel',
    },
  ];

  constructor() {}

  getSupportTables(id: string) {
    return this.listSupportTables.filter((s) => s.Id === id);
  }
}
