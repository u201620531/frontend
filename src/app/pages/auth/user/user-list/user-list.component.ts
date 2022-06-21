import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { NavigationExtras, Router } from '@angular/router';
import { User } from 'src/app/interfaces/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  listUsers: User[] = [];

  displayedColumns: string[] = [
    'Id',
    'Employee.Id',
    'Employee.FirstName',
    'UserProfile.Id',
    'UserProfile.Description',
    'UserName',
    'ActivationStartDate',
    'ActivationEndDate',
    'Estado',
    'Acciones',
  ];
  dataSource!: MatTableDataSource<User>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private _snackBar: MatSnackBar,
    private _UserService: UserService,
    private _router: Router
  ) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  loadUsers() {
    this.listUsers = this._UserService.getUsers();
    this.dataSource = new MatTableDataSource(this.listUsers);
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  deleteUser(index: number) {
    this._UserService.deleteUser(index);
    this.loadUsers();

    this._snackBar.open('El Usuario fue eliminado con éxito.', '', {
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
      duration: 1500,
    });
  }

  editUser(id: string, edit:number): void {
    const extras: NavigationExtras = {
      queryParams: {
        id: id,
        edit: edit
      },
    };
    this._router.navigate(['/user-add'], extras);
  }
}
