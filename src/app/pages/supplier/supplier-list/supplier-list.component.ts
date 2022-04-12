import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { NavigationExtras, Router } from '@angular/router';
import { Supplier } from 'src/app/interfaces/supplier';
import { SupplierService } from 'src/app/services/supplier.service';

@Component({
  selector: 'app-supplier-list',
  templateUrl: './supplier-list.component.html',
  styleUrls: ['./supplier-list.component.css'],
})
export class SupplierListComponent implements OnInit {
  listSuppliers: Supplier[] = [];

  displayedColumns: string[] = [
    'Id',
    'Tipo',
    'Tipo de documento',
    'N° documento',
    'Apellido(s) y Nombre(s)/Razon Social',
    'Nombre comercial',
    'Dirección',
    'Estado',
    'Acciones',
  ];
  dataSource!: MatTableDataSource<Supplier>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private _snackBar: MatSnackBar,
    private _supplierService: SupplierService,
    private _router: Router
  ) {}

  ngOnInit(): void {
    this.loadSuppliers();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  loadSuppliers() {
    this.listSuppliers = this._supplierService.getSuppliers();
    this.dataSource = new MatTableDataSource(this.listSuppliers);
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  deleteSupplier(id: string) {
    this._supplierService.deleteSupplier(id);
    this.loadSuppliers();

    this._snackBar.open('El Proveedor fue eliminado con éxito.', '', {
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
      duration: 1500,
    });
  }

  editSupplier(id: string, edit: number): void {
    const extras: NavigationExtras = {
      queryParams: {
        id: id,
        edit: edit,
      },
    };
    this._router.navigate(['/dashboard/supplier-add'], extras);
  }
}
