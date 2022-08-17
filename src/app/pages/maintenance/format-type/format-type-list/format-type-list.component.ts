import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { NavigationExtras, Router } from '@angular/router';
import { FormatType } from 'src/app/interfaces/format-type';
import { FormatTypeService } from 'src/app/services/format-type.service';
import { filters } from 'src/shared/config';

@Component({
  selector: 'app-format-type-list',
  templateUrl: './format-type-list.component.html',
  styleUrls: ['./format-type-list.component.css'],
})
export class FormatTypeListComponent implements OnInit {
  listFormatTypes: any = [];

  displayedColumns: string[] = [
    'id',
    'description',
    'abbreviation',
    'type',
    'status',
    'Acciones',
  ];
  dataSource!: MatTableDataSource<FormatType>;
  placeholderValue: string = '';

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private _snackBar: MatSnackBar,
    private _formatTypeService: FormatTypeService,
    private _router: Router
  ) {}

  ngOnInit(): void {
    this.placeholderValue = filters.placeholders.wayPay;
    this.loadFormatTypes();
  }

  loadFormatTypes() {
    this._formatTypeService.getFormatTypes().subscribe(
      (res) => {
        this.listFormatTypes = res;
        this.dataSource = new MatTableDataSource<FormatType>();
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

  deleteFormatType(id: string) {
    this._formatTypeService.deleteFormatType(id).subscribe(
      (res) => {
        const result: any = res;
        this._snackBar.open(result.message, '', {
          horizontalPosition: 'center',
          verticalPosition: 'bottom',
          duration: 1500,
        });
        if (result.id === 1) this.loadFormatTypes();
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

  editFormatType(id: string, edit: number): void {
    const extras: NavigationExtras = {
      queryParams: {
        id: id,
        edit: edit,
      },
    };
    this._router.navigate(['/dashboard/format-type-add'], extras);
  }
}
