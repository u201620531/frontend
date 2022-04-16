import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { NavigationExtras, Router } from '@angular/router';
import { WayPay } from 'src/app/interfaces/way-pay';
import { WayPayService } from 'src/app/services/way-pay.service';

@Component({
  selector: 'app-way-pay-list',
  templateUrl: './way-pay-list.component.html',
  styleUrls: ['./way-pay-list.component.css']
})
export class WayPayListComponent implements OnInit {
  listWayPays: WayPay[] = [];

  displayedColumns: string[] = [
    'Id',
    'Descripcion',
    'Abreviatura',
    'Estado',
    'Acciones',
  ];
  dataSource!: MatTableDataSource<WayPay>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private _snackBar: MatSnackBar,
    private _WayPayService: WayPayService,
    private _router: Router
  ) {}

  ngOnInit(): void {
    this.loadWayPays();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  loadWayPays() {
    this.listWayPays = this._WayPayService.getWayPays();
    this.dataSource = new MatTableDataSource(this.listWayPays);
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  deleteWayPay(index: number) {
    this._WayPayService.deleteWayPay(index);
    this.loadWayPays();

    this._snackBar.open('La Forma de pago fue eliminada con éxito.', '', {
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
      duration: 1500,
    });
  }

  editWayPay(id: string, edit:number): void {
    const extras: NavigationExtras = {
      queryParams: {
        id: id,
        edit: edit
      },
    };
    this._router.navigate(['/dashboard/way-pay-add'], extras);
  }
}
