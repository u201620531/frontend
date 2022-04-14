import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { NavigationExtras, Router } from '@angular/router';
import { FormatType } from 'src/app/interfaces/format-type';
import { FormatTypeService } from 'src/app/services/format-type.service';

@Component({
  selector: 'app-format-type-list',
  templateUrl: './format-type-list.component.html',
  styleUrls: ['./format-type-list.component.css']
})
export class FormatTypeListComponent implements OnInit {
  listFormatTypes: FormatType[] = [];

  displayedColumns: string[] = [
    'Id',
    'Descripcion',
    'Abreviatura',
    'Tipo',
    'Estado',
    'Acciones',
  ];
  dataSource!: MatTableDataSource<FormatType>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private _snackBar: MatSnackBar,
    private _FormatTypeService: FormatTypeService,
    private _router: Router
  ) {}

  ngOnInit(): void {
    this.loadFormatTypes();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  loadFormatTypes() {
    this.listFormatTypes = this._FormatTypeService.getFormatTypes();
    this.dataSource = new MatTableDataSource(this.listFormatTypes);
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  deleteFormatType(index: number) {
    this._FormatTypeService.deleteFormatType(index);
    this.loadFormatTypes();

    this._snackBar.open('El Tipo de formato fue eliminado con éxito.', '', {
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
      duration: 1500,
    });
  }

  editFormatType(id: string, edit:number): void {
    const extras: NavigationExtras = {
      queryParams: {
        id: id,
        edit: edit
      },
    };
    this._router.navigate(['/dashboard/format-type-add'], extras);
  }
}