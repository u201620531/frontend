import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { NavigationExtras, Router } from '@angular/router';
import { DocumentType } from 'src/app/interfaces/document-type';
import { DocumentTypeService } from 'src/app/services/document-type.service';
import { filters } from 'src/shared/config';

@Component({
  selector: 'app-document-type-list',
  templateUrl: './document-type-list.component.html',
  styleUrls: ['./document-type-list.component.css'],
})
export class DocumentTypeListComponent implements OnInit {
  listDocumentTypes: DocumentType[] = [];

  displayedColumns: string[] = [
    'id',
    'description',
    'abbreviation',
    'type',
    'status',
    'Acciones',
  ];
  dataSource!: MatTableDataSource<DocumentType>;
  placeholderValue: string = '';

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private _snackBar: MatSnackBar,
    private _documentTypeService: DocumentTypeService,
    private _router: Router
  ) {}

  ngOnInit(): void {
    this.placeholderValue = filters.placeholders.wayPay;
    this.loadDocumentTypes();
  }

  loadDocumentTypes() {
    this._documentTypeService.getDocumentTypes().subscribe(
      (res) => {
        this.listDocumentTypes = res;
        this.dataSource = new MatTableDataSource<DocumentType>();
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

  deleteDocumentType(id: string) {
    this._documentTypeService.deleteDocumentType(id).subscribe(
      (res) => {
        const result: any = res;
        this._snackBar.open(result.message, '', {
          horizontalPosition: 'center',
          verticalPosition: 'bottom',
          duration: 1500,
        });
        if (result.id === 1) this.loadDocumentTypes();
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

  editDocumentType(id: string, edit: number): void {
    const extras: NavigationExtras = {
      queryParams: {
        id: id,
        edit: edit,
      },
    };
    this._router.navigate(['/dashboard/document-type-add'], extras);
  }
}
