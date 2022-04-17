import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { NavigationExtras, Router } from '@angular/router';
import { UserProfile } from 'src/app/interfaces/user-profile';
import { UserProfileService } from 'src/app/services/user-profile.service';

@Component({
  selector: 'app-user-profile-list',
  templateUrl: './user-profile-list.component.html',
  styleUrls: ['./user-profile-list.component.css']
})
export class UserProfileListComponent implements OnInit {
  listUserProfiles: UserProfile[] = [];

  displayedColumns: string[] = [
    'Id',
    'Descripcion',
    'Estado',
    'Acciones',
  ];
  dataSource!: MatTableDataSource<UserProfile>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private _snackBar: MatSnackBar,
    private _UserProfileService: UserProfileService,
    private _router: Router
  ) {}

  ngOnInit(): void {
    this.loadUserProfiles();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  loadUserProfiles() {
    this.listUserProfiles = this._UserProfileService.getUserProfiles();
    this.dataSource = new MatTableDataSource(this.listUserProfiles);
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  deleteUserProfile(index: number) {
    this._UserProfileService.deleteUserProfile(index);
    this.loadUserProfiles();

    this._snackBar.open('El Perfil de usuario fue eliminado con éxito.', '', {
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
      duration: 1500,
    });
  }

  editUserProfile(id: string, edit:number): void {
    const extras: NavigationExtras = {
      queryParams: {
        id: id,
        edit: edit
      },
    };
    this._router.navigate(['/user-profile-add'], extras);
  }
}
