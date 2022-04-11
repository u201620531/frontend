import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Customer } from 'src/app/interfaces/customer';
import { CustomerService } from 'src/app/services/customer.service';

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.css']
})
export class CustomerListComponent implements OnInit {
  listCustomers: Customer[] = [];

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
  dataSource!: MatTableDataSource<Customer>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private _snackBar: MatSnackBar,
    private _customerService: CustomerService
  ) {}

  ngOnInit(): void {
    this.loadCustomers();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  loadCustomers() {
    this.listCustomers =
      this._customerService.getCustomers();
    this.dataSource = new MatTableDataSource(this.listCustomers);
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  deleteCustomer(index: number) {
    this._customerService.deleteCustomer(index);
    this.loadCustomers();

    this._snackBar.open(
      'El Cliente fue eliminado con éxito.',
      '',
      {
        horizontalPosition: 'center',
        verticalPosition: 'bottom',
        duration: 1500,
      }
    );
  }
}
