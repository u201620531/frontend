import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ScannedElectronicDocument } from 'src/app/interfaces/scanned-electronic-document';

@Component({
  selector: 'app-scan',
  templateUrl: './scan.component.html',
  styleUrls: ['./scan.component.css']
})
export class ScanComponent implements OnInit { 
  listScannedElectronicDocument: ScannedElectronicDocument[] = [];

  displayedColumns: string[] = [
    'Id',
    'Name',
    'FileType',
    'FileSize',
    'State',
    'Detail',
    'Actions',
  ];
  dataSource!: MatTableDataSource<ScannedElectronicDocument>;
  scannedElectronicDocument: any = [];

  constructor() { }

  ngOnInit(): void {
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

  scan(event: any): void {
    var selectedFiles = event.target.files;
    console.log(selectedFiles);
    let id = this.listScannedElectronicDocument.length;
    for (var i = 0; i < selectedFiles.length; i++) {
      id += 1;
      this.scannedElectronicDocument = {
        Id: id,
        Name: selectedFiles[i].name,
        FileType: selectedFiles[i].type,
        FileSize: selectedFiles[i].size,
        State: 'C',
        Detail: '',
        ScanDate: new Date().toLocaleString(),
        ScanUser: 'jlre'
      }
      this.listScannedElectronicDocument.push(this.scannedElectronicDocument);
    }
    this.loadListScannedElectronicDocuments();
  }

  loadListScannedElectronicDocuments() {
    this.dataSource = new MatTableDataSource(this.listScannedElectronicDocument);
  }

  cleanListScannedElectronicDocuments() {
    this.listScannedElectronicDocument=[];
    this.dataSource = new MatTableDataSource(this.listScannedElectronicDocument);
  }
}
