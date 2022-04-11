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
          Id: 'RUC',
          Description: 'RUC'
        },
        DocumentNumber: '12345678910',
        BusinessName: 'Logistic Peru SAC',
        State: 'A',
        CreationDate: '15-03-2022',
        CreationUser: 'jlre'
      },
      DocumentType: {
        Id: 'FAC',
        Description: 'Factura'
      },
      TransactionType: {
        Id: 'V',
        Description: 'Venta'
      },
      FormatType: {
        Id: 'PDF',
        Description: 'Documento PDF'
      },
      WayPay: {
        Id: 'CON',
        Description: 'Contado'
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
          Id: 'RUC',
          Description: 'RUC'
        },
        DocumentNumber: '23456789101',
        BusinessName: 'Andamios Prado SRL',
        State: 'A',
        CreationDate: '15-03-2022',
        CreationUser: 'jlre'
      },
      DocumentType: {
        Id: 'FAC',
        Description: 'Factura'
      },
      
      TransactionType: {
        Id: 'C',
        Description: 'Compra'
      },
      FormatType: {
        Id: 'XML',
        Description: 'Documento XML'
      },
      WayPay: {
        Id: 'CRE90',
        Description: 'Crédito 90 días'
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
          Id: 'DNI',
          Description: 'DNI'
        },
        DocumentNumber: '12345678',
        BusinessName: 'Manuel Juarez',
        State: 'A',
        CreationDate: '15-03-2022',
        CreationUser: 'jlre'
      },
      DocumentType: {
        Id: 'FAC',
        Description: 'Factura'
      },
      TransactionType: {
        Id: 'V',
        Description: 'Venta'
      },
      FormatType: {
        Id: 'PDF',
        Description: 'Documento PDF'
      },
      WayPay: {
        Id: 'CON',
        Description: 'Contado'
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
    console.log(index);
    this.listElectronicDocuments.splice(index, 1);
  }

  addDocumentTypes(electronicDocument: ElectronicDocuments) {
    this.listElectronicDocuments.unshift(electronicDocument);
  }
}
