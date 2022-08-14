import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { NavigationExtras, Router } from '@angular/router';
import { TransactionType } from 'src/app/interfaces/transaction-type';
import { TransactionTypeService } from 'src/app/services/transaction-type.service';

@Component({
  selector: 'app-transaction-type-list',
  templateUrl: './transaction-type-list.component.html',
  styleUrls: ['./transaction-type-list.component.css']
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

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private _snackBar: MatSnackBar,
    private _TransactionTypeService: TransactionTypeService,
    private _router: Router
  ) {}

  ngOnInit(): void {
    this.loadTransactionTypes();
  }

  loadTransactionTypes() {
    this._TransactionTypeService.getTransactionTypes().subscribe(
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
    this.listTransactionTypes = this._TransactionTypeService.getTransactionTypes();
    this.dataSource = new MatTableDataSource(this.listTransactionTypes);
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  deleteTransactionType(index: string) {
    this._TransactionTypeService.deleteTransactionType(index);
    this.loadTransactionTypes();

    this._snackBar.open('El Tipo de transacción fue eliminado con éxito.', '', {
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
      duration: 1500,
    });
  }

  editTransactionType(id: string, edit:number): void {
    const extras: NavigationExtras = {
      queryParams: {
        id: id,
        edit: edit
      },
    };
    this._router.navigate(['/dashboard/transaction-type-add'], extras);
  }
}
