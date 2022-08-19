import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { NavigationExtras, Router } from '@angular/router';
import { Customer } from 'src/app/interfaces/customer';
import { CustomerService } from 'src/app/services/customer.service';
import { filters } from 'src/shared/config';

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.css'],
})
export class CustomerListComponent implements OnInit {
  listCustomers: Customer[] = [];

  displayedColumns: string[] = [
    'id',
    'customerType',
    'documentType',
    'documentNumber',
    'businessName',
    'comercialName',
    'address',
    'status',
    'Acciones',
  ];
  dataSource!: MatTableDataSource<Customer>;
  placeholderValue: string = '';

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private _snackBar: MatSnackBar,
    private _customerService: CustomerService,
    private _router: Router
  ) {}

  ngOnInit(): void {
    this.placeholderValue = filters.placeholders.customer;
    this.loadCustomers();
  }

  loadCustomers() {
    this._customerService.getCustomers().subscribe(
      (res) => {
        this.listCustomers = res;
        this.dataSource = new MatTableDataSource<Customer>();
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

  deleteCustomer(index: string) {
    this._customerService.deleteCustomer(index);
    this.loadCustomers();

    this._snackBar.open('El Cliente fue eliminado con éxito.', '', {
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
      duration: 1500,
    });
  }

  editCustomer(id: string, edit:number): void {
    const extras: NavigationExtras = {
      queryParams: {
        id: id,
        edit: edit
      },
    };
    this._router.navigate(['/dashboard/customer-add'], extras);
  }
}
