import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { SupportTable } from '../interfaces/support-table';

@Injectable({
  providedIn: 'root',
})
export class SupportTableService {
  // listSupportTables: SupportTable[] = [
  //   { Id: 'TTD', Name: 'Tipo de Documento', Value: 'C', Description: 'Compra' },
  //   {
  //     Id: 'TTD',
  //     Name: 'Tipo de Documento',
  //     Value: 'R',
  //     Description: 'Reporte',
  //   },
  //   { Id: 'TTD', Name: 'Tipo de Documento', Value: 'V', Description: 'Venta' },
  //   {
  //     Id: 'TFD',
  //     Name: 'Tipo formato de Documento',
  //     Value: 'XLS',
  //     Description: 'Excel',
  //   },
  // ];

  constructor(private http:HttpClient) {}

  getSupportTables():Observable<any> {
    return this.http.get(`${environment.apiURL}/supporttables`);
  }

  getSupportTableById(id: string):Observable<any> {
    return this.http.get(`${environment.apiURL}/supporttables/${id}`);
  }

  deleteSupportTable(id: string) {
    this.http.delete(`${environment.apiURL}/supporttables/${id}`);
  }

  addSupportTable(SupportTable: SupportTable) {
    return this.http.post(`${environment.apiURL}/supporttables`, SupportTable);
  }

  editSupportTable(SupportTable: SupportTable) {
    return this.http.put(`${environment.apiURL}/supporttables`, SupportTable);
  }
}
