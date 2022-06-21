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
import { Employee } from 'src/app/interfaces/employee';
import { EmployeeService } from 'src/app/services/employee.service';
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';

export interface DialogData {
  idEmployee: string;
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

  listEmployees: Employee[] = [];

  displayedColumns: string[] = ['Id', 'Name'];
  dataSourceEmployees!: MatTableDataSource<Employee>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    public dialogRef: MatDialogRef<SearchModalComponent>,
    private _employeeService: EmployeeService,
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
    this.dataSourceEmployees.paginator = this.paginator;
    this.dataSourceEmployees.sort = this.sort;
  }

  loadDocumentTypes() {
    this.listEmployees = this._employeeService.getEmployees();
    this.dataSourceEmployees = new MatTableDataSource(this.listEmployees);
  }

  applyFilterEmployee(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSourceEmployees.filter = filterValue.trim().toLowerCase();
  }
}
