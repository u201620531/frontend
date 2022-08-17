import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { NavigationExtras, Router } from '@angular/router';
import { TransactionType } from 'src/app/interfaces/transaction-type';
import { TransactionTypeService } from 'src/app/services/transaction-type.service';
import { filters } from 'src/shared/config';

@Component({
  selector: 'app-transaction-type-list',
  templateUrl: './transaction-type-list.component.html',
  styleUrls: ['./transaction-type-list.component.css'],
})
export class TransactionTypeListComponent implements OnInit {
  listTransactionTypes: any = [];

  displayedColumns: string[] = [
    'id',
    'description',
    'abbreviation',
    'type',
    'status',
    'Acciones',
  ];
  dataSource!: MatTableDataSource<TransactionType>;
  placeholderValue: string = '';

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private _snackBar: MatSnackBar,
    private _transactionTypeService: TransactionTypeService,
    private _router: Router
  ) {}

  ngOnInit(): void {
    this.placeholderValue = filters.placeholders.wayPay;
    this.loadTransactionTypes();
  }

  loadTransactionTypes() {
    this._transactionTypeService.getTransactionTypes().subscribe(
      (res) => {
        this.listTransactionTypes = res;
        this.dataSource = new MatTableDataSource<TransactionType>();
        this.dataSource.data = res;
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      (err) => {
        console.log(err.message);
      }
    );
    this.listTransactionTypes =
      this._transactionTypeService.getTransactionTypes();
    this.dataSource = new MatTableDataSource(this.listTransactionTypes);
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  deleteTransactionType(id: string) {
    this._transactionTypeService.deleteTransactionType(id).subscribe(
      (res) => {
        const result: any = res;
        this._snackBar.open(result.message, '', {
          horizontalPosition: 'center',
          verticalPosition: 'bottom',
          duration: 1500,
        });
        if (result.id === 1) this.loadTransactionTypes();
      },
      (err) => {
        this._snackBar.open(err.message, '', {
          horizontalPosition: 'center',
          verticalPosition: 'bottom',
          duration: 1500,
        });
      }
    );
  }

  editTransactionType(id: string, edit: number): void {
    const extras: NavigationExtras = {
      queryParams: {
        id: id,
        edit: edit,
      },
    };
    this._router.navigate(['/dashboard/transaction-type-add'], extras);
  }
}
