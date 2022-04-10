import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ElectronicDocuments } from 'src/app/interfaces/electronic-documents';
import { ElectronicDocumentsService } from 'src/app/services/electronic-documents.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
})
export class ListComponent implements OnInit, AfterViewInit {
  listElectronicDocuments: ElectronicDocuments[] = [];

  displayedColumns: string[] = [
    'N°',
    'Serie',
    'Numero',
    'Fecha de escaneo',
    'Apellido(s) y Nombre(s)/Razon Social',
    'Tipo de transaccion',
    'Tipo de documento',
    'Tipo de formato',
    'Forma de pago',
    'Total',
    'Moneda',
    'Estado',
    'Acciones',
  ];
  dataSource!: MatTableDataSource<ElectronicDocuments>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private _snackBar: MatSnackBar,
    private _electronicDocumentsService: ElectronicDocumentsService
  ) {}

  ngOnInit(): void {
    this.loadElectronicDocuments();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  loadElectronicDocuments() {
    this.listElectronicDocuments =
      this._electronicDocumentsService.getElectronicDocuments();
    this.dataSource = new MatTableDataSource(this.listElectronicDocuments);
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  deleteElectronicDocument(index: number) {
    this._electronicDocumentsService.deleteElectronicDocument(index);
    this.loadElectronicDocuments();

    this._snackBar.open(
      'El Comprobante electrónico fue eliminado con éxito.',
      '',
      {
        horizontalPosition: 'center',
        verticalPosition: 'bottom',
        duration: 1500,
      }
    );
  }
}
