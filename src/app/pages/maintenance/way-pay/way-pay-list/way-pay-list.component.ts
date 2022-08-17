import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { NavigationExtras, Router } from '@angular/router';
import { WayPay } from 'src/app/interfaces/way-pay';
import { WayPayService } from 'src/app/services/way-pay.service';
import { filters } from 'src/shared/config';

@Component({
  selector: 'app-way-pay-list',
  templateUrl: './way-pay-list.component.html',
  styleUrls: ['./way-pay-list.component.css'],
})
export class WayPayListComponent implements OnInit {
  listWayPays: WayPay[] = [];
  displayedColumns: string[] = [
    'id',
    'description',
    'abbreviation',
    'status',
    'Acciones',
  ];
  dataSource!: MatTableDataSource<WayPay>;
  placeholderValue: string = '';

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private _snackBar: MatSnackBar,
    private _wayPayService: WayPayService,
    private _router: Router
  ) {}

  ngOnInit(): void {
    this.placeholderValue = filters.placeholders.wayPay;
    this.loadWayPays();
  }

  loadWayPays() {
    this._wayPayService.getWayPays().subscribe(
      (res) => {
        this.listWayPays = res;
        this.dataSource = new MatTableDataSource<WayPay>();
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

  deleteWayPay(id: string) {
    this._wayPayService.deleteWayPay(id).subscribe(
      (res) => {
        const result: any = res;
        this._snackBar.open(result.message, '', {
          horizontalPosition: 'center',
          verticalPosition: 'bottom',
          duration: 1500,
        });
        if (result.id === 1) this.loadWayPays();
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

  editWayPay(id: string, edit: number): void {
    const extras: NavigationExtras = {
      queryParams: {
        id: id,
        edit: edit,
      },
    };

    this._router.navigate(['/dashboard/way-pay-add'], extras);
  }
}
