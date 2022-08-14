import { Injectable } from '@angular/core';
import { ElectronicDocuments } from '../interfaces/electronic-documents';

@Injectable({
  providedIn: 'root',
})
export class ElectronicDocumentsService {
  listElectronicDocuments: ElectronicDocuments[] = [
    {
      Id: 1,
      Serie: 'XXX',
      Number: '12345678',
      Customer: {
        Id: 'C0000001',
        CustomerType: 'J',
        DocumentType: {
          id: 'RUC',
          description: 'RUC',
          status: 'A'
        },
        DocumentNumber: '12345678910',
        BusinessName: 'Logistic Peru SAC',
        State: 'A',
        CreationDate: '15-03-2022',
        CreationUser: 'jlre'
      },
      DocumentType: {
        id: 'FAC',
        description: 'Factura',
        status: 'A'
      },
      TransactionType: {
        id: 'V',
        description: 'Venta',
        status: 'A'
      },
      FormatType: {
        id: 'PDF',
        description: 'Documento PDF',
        status: 'A'
      },
      WayPay: {
        id: 'CON',
        description: 'Contado',
        status: 'A'
      },
      Total: 25.12,
      Money: {
        Id: 'SOL',
        Description: 'Nuevos Soles'
      },
      State: 'Pendiente',
      ScanDate: '01-03-2022',
      ScanUser: 'JLRE'
    },
    {
      Id: 2,
      Serie: '001',
      Number: '4578451',
      Supplier: {
        Id: 'S0000001',
        SupplierType: 'J',
        DocumentType: {
          id: 'RUC',
          description: 'RUC',
          status: 'A'
        },
        DocumentNumber: '23456789101',
        BusinessName: 'Andamios Prado SRL',
        State: 'A',
        CreationDate: '15-03-2022',
        CreationUser: 'jlre'
      },
      DocumentType: {
        id: 'FAC',
        description: 'Factura',
        status: 'A'
      },
      
      TransactionType: {
        id: 'C',
        description: 'Compra',
        status: 'A'
      },
      FormatType: {
        id: 'XML',
        description: 'Documento XML',
        status: 'A'
      },
      WayPay: {
        id: 'CRE90',
        description: 'Crédito 90 días',
        status: 'A'
      },
      Total: 25.12,
      Money: {
        Id: 'DOL',
        Description: 'Dólares Americanos'
      },
      State: 'Cancelado',
      ScanDate: '01-03-2022',
      ScanUser: 'JLRE'
    },
    {
      Id: 3,  
      Serie: '999',
      Number: '236545',
      Customer: {
        Id: 'C0000002',
        CustomerType: 'N',
        DocumentType: {
          id: 'DNI',
          description: 'DNI',
          status: 'A'
        },
        DocumentNumber: '12345678',
        BusinessName: 'Manuel Juarez',
        State: 'A',
        CreationDate: '15-03-2022',
        CreationUser: 'jlre'
      },
      DocumentType: {
        id: 'FAC',
        description: 'Factura',
        status: 'A'
      },
      TransactionType: {
        id: 'V',
        description: 'Venta',
        status: 'A'
      },
      FormatType: {
        id: 'PDF',
        description: 'Documento PDF',
        status: 'A'
      },
      WayPay: {
        id: 'CON',
        description: 'Contado',
        status: 'A'
      },
      Total: 25.12,
      Money: {
        Id: 'SOL',
        Description: 'Nuevos Soles'
      },
      State: 'Pendiente',
      ScanDate: '01-03-2022',
      ScanUser: 'JLRE'
    },
  ];

  constructor() {}

  getElectronicDocuments() {
    return this.listElectronicDocuments.slice();
  }

  deleteElectronicDocument(index: number) {
    this.listElectronicDocuments.splice(index, 1);
  }

  addDocumentTypes(electronicDocument: ElectronicDocuments) {
    this.listElectronicDocuments.unshift(electronicDocument);
  }
}
