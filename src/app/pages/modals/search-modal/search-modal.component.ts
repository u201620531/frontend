import {
  AfterViewInit,
  Component,
  EventEmitter,
  Inject,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Empleado } from 'src/app/interfaces/empleado';
import { EmpleadoService } from 'src/app/services/empleado.service';
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';

export interface DialogData {
  idEmpleado: string;
}

@Component({
  selector: 'app-search-modal',
  templateUrl: './search-modal.component.html',
  styleUrls: ['./search-modal.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition(
        'expanded <=> collapsed',
        animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')
      ),
    ]),
  ],
})
export class SearchModalComponent implements OnInit, AfterViewInit {
  @Output() idSelected: EventEmitter<string> = new EventEmitter<string>();

  listaEmpleados: Empleado[] = [];

  displayedColumns: string[] = ['Id', 'Name'];
  dataSourceEmpleados!: MatTableDataSource<Empleado>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    public dialogRef: MatDialogRef<SearchModalComponent>,
    private _EmpleadoService: EmpleadoService,
    public _dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {}

  onNoClick(): void {
    //this.editEnabledChange.emit(true);
    this.dialogRef.close();
  }

  ngOnInit(): void {
    this.loadDocumentTypes();
  }

  ngAfterViewInit() {
    this.dataSourceEmpleados.paginator = this.paginator;
    this.dataSourceEmpleados.sort = this.sort;
  }

  loadDocumentTypes() {
    // this.listarEmpleados = this._EmpleadoService.listarEmpleados();
    this.dataSourceEmpleados = new MatTableDataSource(this.listaEmpleados);
  }

  aplicarFiltroEmpleado(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSourceEmpleados.filter = filterValue.trim().toLowerCase();
  }
}
