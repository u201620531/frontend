import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { NavigationExtras, Router } from '@angular/router';
import { DocumentType } from 'src/app/interfaces/document-type';
import { DocumentTypeService } from 'src/app/services/document-type.service';

@Component({
  selector: 'app-document-type-list',
  templateUrl: './document-type-list.component.html',
  styleUrls: ['./document-type-list.component.css']
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

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private _snackBar: MatSnackBar,
    private _documentTypeService: DocumentTypeService,
    private _router: Router
  ) {}

  ngOnInit(): void {
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
    );}

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  deleteDocumentType(index: string) {
    this._documentTypeService.deleteDocumentType(index);
    this.loadDocumentTypes();

    this._snackBar.open('El Tipo de documento fue eliminado con éxito.', '', {
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
      duration: 1500,
    });
  }

  editDocumentType(id: string, edit:number): void {
    const extras: NavigationExtras = {
      queryParams: {
        id: id,
        edit: edit
      },
    };
    this._router.navigate(['/dashboard/document-type-add'], extras);
  }
}
