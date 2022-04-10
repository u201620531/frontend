import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { DigitalizedElectronicDocument } from 'src/app/interfaces/digitalized-electronic-document';
import { ScannedElectronicDocument } from 'src/app/interfaces/scanned-electronic-document';
import {SelectionModel} from '@angular/cdk/collections';

@Component({
  selector: 'app-get-information',
  templateUrl: './get-information.component.html',
  styleUrls: ['./get-information.component.css']
})
export class GetInformationComponent implements OnInit {
  listScannedElectronicDocument: ScannedElectronicDocument[] = [];
  listDigitalizedElectronicDocument: DigitalizedElectronicDocument[] = [];
  scannedElectronicDocument: any;
  digitalizedElectronicDocument: any;
  
  selection = new SelectionModel<DigitalizedElectronicDocument>(true, []);

  displayedScannedElectronicDocumentsColumns: string[] = [
    'select',
    'Id',
    'Name',
    'FileType',
    'FileSize',
    'State'
  ];
  displayedDigitalizedElectronicDocumentsColumns: string[] = [
    'Id',
    'Name',
    'FileType',
    'DocumentType',
    'FormatType',
    'WayPay',
    'FileSize',
    'State',
    'Actions'
  ];
  dataSourceScannedElectronicDocument!: MatTableDataSource<ScannedElectronicDocument>;
  dataSourceDigitalizedElectronicDocument!: MatTableDataSource<DigitalizedElectronicDocument>;

  constructor() { }

  ngOnInit(): void {
    this.loadListScannedElectronicDocuments();
    this.loadListDigitalizedElectronicDocuments();
  }

  deleteScannedElectronicDocument(index: number) {
    // this._electronicDocumentsService.deleteElectronicDocument(index);
    // this.loadElectronicDocuments();

    // this._snackBar.open(
    //   'El Comprobante electrónico fue eliminado con éxito.',
    //   '',
    //   {
    //     horizontalPosition: 'center',
    //     verticalPosition: 'bottom',
    //     duration: 1500,
    //   }
    // );
  }

  loadListScannedElectronicDocuments() {
    this.scannedElectronicDocument = {
      Id: 1,
      Name: 'prueba.pdf',
      FileType: 'pdf',
      FileSize: 132456,
      State: 'C',
      Detail: '',
      ScanDate: new Date().toLocaleString(),
      ScanUser: 'jlre'
    }
    this.listScannedElectronicDocument.push(this.scannedElectronicDocument);
    this.scannedElectronicDocument = {
      Id: 2,
      Name: 'prueba2.pdf',
      FileType: 'pdf',
      FileSize: 55120121456,
      State: 'C',
      Detail: '',
      ScanDate: new Date().toLocaleString(),
      ScanUser: 'jlre'
    }
    this.listScannedElectronicDocument.push(this.scannedElectronicDocument);
    this.scannedElectronicDocument = {
      Id: 3,
      Name: 'prueba3.xml',
      FileType: 'sml',
      FileSize: 132468956,
      State: 'C',
      Detail: '',
      ScanDate: new Date().toLocaleString(),
      ScanUser: 'jlre'
    }
    this.listScannedElectronicDocument.push(this.scannedElectronicDocument);
    this.dataSourceScannedElectronicDocument = new MatTableDataSource(this.listScannedElectronicDocument);
  }

  loadListDigitalizedElectronicDocuments() {
    this.digitalizedElectronicDocument = {
      Id: 1,
      Name: 'prueba.pdf',
      FileRoute: 'c:\prueba.pdf',
      FileContent: 'xxxxxxxxxxxxxx',
      FileType: 'pdf',
      DocumentType: {
        Id: 'FAC',
        Description: 'Factura'
      },
      FormatType: {
        Id: 'PDF',
        Description: 'Documento PDF'
      },
      WayPay: {
        Id: 'CON',
        Description: 'Contado'
      },
      FileSize: 132456,
      State: 'C',
      Detail: '',
      DigitalizedDate: new Date().toLocaleString(),
      DigitalizedUser: 'jlre'
    }
    this.listDigitalizedElectronicDocument.push(this.digitalizedElectronicDocument);
    this.digitalizedElectronicDocument = {
      Id: 2,
      Name: 'prueba2.xml',
      FileRoute: 'c:\prueba2.xml',
      FileContent: 'FUJFJBT67 7  IG8778GJHBJHH  JJJGHJ',
      FileType: 'xml',
      DocumentType: {
        Id: 'FAC',
        Description: 'Factura'
      },
      FormatType: {
        Id: 'XML',
        Description: 'Documento XML'
      },
      WayPay: {
        Id: 'CON',
        Description: 'Contado'
      },
      FileSize: 132456,
      State: 'C',
      Detail: '',
      DigitalizedDate: new Date().toLocaleString(),
      DigitalizedUser: 'jlre'
    }
    this.listDigitalizedElectronicDocument.push(this.digitalizedElectronicDocument);
    this.digitalizedElectronicDocument = {
      Id: 3,
      Name: 'prueba3.pdf',
      FileRoute: 'c:\prueba3.pdf',
      FileContent: 'xxxxxxxxxxxxxx',
      FileType: 'pdf',
      DocumentType: {
        Id: 'BOL',
        Description: 'Boleta'
      },
      FormatType: {
        Id: 'PDF',
        Description: 'Documento PDF'
      },
      WayPay: {
        Id: 'CRE',
        Description: 'Crédito'
      },
      FileSize: 132456,
      State: 'C',
      Detail: '',
      DigitalizedDate: new Date().toLocaleString(),
      DigitalizedUser: 'jlre'
    }
    this.listDigitalizedElectronicDocument.push(this.digitalizedElectronicDocument);
    this.dataSourceDigitalizedElectronicDocument = new MatTableDataSource(this.listDigitalizedElectronicDocument);
    console.log('listDigitalizedElectronicDocument',this.listDigitalizedElectronicDocument);
    console.log('dataSourceDigitalizedElectronicDocument',this.dataSourceDigitalizedElectronicDocument);
  }

  cleanListDigitalizedElectronicDocuments() {
    this.listDigitalizedElectronicDocument=[];
    this.dataSourceDigitalizedElectronicDocument = new MatTableDataSource(this.listDigitalizedElectronicDocument);
  }

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSourceDigitalizedElectronicDocument.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    console.log(this.selection.selected.length);
    console.log(this.dataSourceDigitalizedElectronicDocument.data.length);
    this.isAllSelected() ?
        this.selection.clear() :
        this.dataSourceDigitalizedElectronicDocument.data.forEach(row => this.selection.select(row));
    this.dataSourceDigitalizedElectronicDocument.data.forEach(row => console.log(row));
  }
}
