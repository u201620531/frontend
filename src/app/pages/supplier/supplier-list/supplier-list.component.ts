import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { NavigationExtras, Router } from '@angular/router';
import { Supplier } from 'src/app/interfaces/supplier';
import { SupplierService } from 'src/app/services/supplier.service';
import { filters } from 'src/shared/config';

@Component({
  selector: 'app-supplier-list',
  templateUrl: './supplier-list.component.html',
  styleUrls: ['./supplier-list.component.css'],
})
export class SupplierListComponent implements OnInit {
  listSuppliers: Supplier[] = [];

  displayedColumns: string[] = [
    'id',
    'supplierType',
    'documentType',
    'documentNumber',
    'businessName',
    'comercialName',
    'address',
    'status',
    'Acciones',
  ];
  dataSource!: MatTableDataSource<Supplier>;
  placeholderValue: string = '';

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private _snackBar: MatSnackBar,
    private _supplierService: SupplierService,
    private _router: Router
  ) {}

  ngOnInit(): void {
    this.placeholderValue = filters.placeholders.supplier;
    this.loadSuppliers();
  }

  loadSuppliers() {
    this._supplierService.getSuppliers().subscribe(
      (res) => {
        this.listSuppliers = res;
        this.dataSource = new MatTableDataSource<Supplier>();
        this.dataSource.data = res;
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      (err) => {
        console.log(err.message);
      }
    );
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  deleteSupplier(index: string) {
    this._supplierService.deleteSupplier(index);
    this.loadSuppliers();

    this._snackBar.open('El Proveedor fue eliminado con éxito.', '', {
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
      duration: 1500,
    });
  }

  editSupplier(id: string, edit:number): void {
    const extras: NavigationExtras = {
      queryParams: {
        id: id,
        edit: edit
      },
    };
    this._router.navigate(['/dashboard/supplier-add'], extras);
  }
}
