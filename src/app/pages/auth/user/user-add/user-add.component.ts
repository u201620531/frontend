import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Employee } from 'src/app/interfaces/employee';
import { User } from 'src/app/interfaces/user';
import { UserProfile } from 'src/app/interfaces/user-profile';
import { ConfirmationModalComponent } from 'src/app/pages/modals/confirmation-modal/confirmation-modal.component';
import { SearchModalComponent } from 'src/app/pages/modals/search-modal/search-modal.component';
import { EmployeeService } from 'src/app/services/employee.service';
import { UserProfileService } from 'src/app/services/user-profile.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-add',
  templateUrl: './user-add.component.html',
  styleUrls: ['./user-add.component.css'],
})
export class UserAddComponent implements OnInit {
  form: FormGroup;
  listUsers: User[] = [];
  listUserProfiles: UserProfile[] = [];
  IdUser: string = '';
  readonlyOption: boolean = false;
  confirmation: boolean = false;
  idUserProfile: string = '';
  idEmployee: string = '';
  nameEmployee: string = '';

  constructor(
    private _userService: UserService,
    private _employeeService: EmployeeService,
    private _userProfileService: UserProfileService,
    private _formBuilder: FormBuilder,
    private _snackBar: MatSnackBar,
    private _router: Router,
    private _route: ActivatedRoute,
    public _dialog: MatDialog
  ) {
    this.form = this._formBuilder.group({
      Id: ['', Validators.required],
      Employee: ['', Validators.required],
      UserProfile: ['', Validators.required],
      UserName: ['', Validators.required],
      Password: ['', Validators.required],
      ActivationStartDate: ['', Validators.required],
      ActivationEndDate: ['', Validators.required],
      State: [''],
    });
  }

  ngOnInit(): void {
    this.loadUserProfiles();
    this.initParams();
  }

  initParams(): void {
    this._route.queryParams.subscribe((params) => {
      if (params && params['id']) {
        this.IdUser = params['id'];
        const user: User[] = this.getUser(this.IdUser);
        this.idUserProfile = user[0].UserProfile.Id;
        this.nameEmployee = user[0].Employee.FirstName + ' ' + user[0].Employee.LastName;
        this.form.setValue({
          Id: user[0].Id,
          Employee: user[0].Employee,
          UserProfile: user[0].UserProfile,
          UserName: user[0].UserName,
          Password: user[0].Password,
          ActivationStartDate: user[0].ActivationStartDate,
          ActivationEndDate: user[0].ActivationEndDate,
          State: user[0].State,
        });
      }
      if (params && params['edit']) {
        this.readonlyOption = params['edit'] !== '1' ? true : false;
      }
    });
  }

  loadUsers() {
    this.listUsers = this._userService.getUsers();
  }

  loadUserProfiles() {
    this.listUserProfiles = this._userProfileService.getUserProfiles();
  }

  getUser(id: string) {
    return this._userService.getUserById(id);
  }

  addUser() {
    const user: User = {
      Id: this.form.value.Id,
      Employee: this.form.value.Employee,
      UserProfile: this.form.value.UserProfile,
      UserName: this.form.value.UserName,
      Password: this.form.value.Password,
      ActivationStartDate: this.form.value.ActivationStartDate,
      ActivationEndDate: this.form.value.ActivationEndDate,
      State: this.form.value.State,
      CreationDate: new Date().toLocaleDateString(),
      CreationUser: this.form.value.CreationUser,
    };

    this._userService.addUser(user);
    this.back();
    this._snackBar.open('El Usuario fue registrado con éxito.', '', {
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
      duration: 1500,
    });
  }

  back() {
    this._router.navigate(['/user-list']);
  }

  deleteUser(): void {
    const dialogRef = this._dialog.open(ConfirmationModalComponent, {
      width: '350px',
      data: {
        confirmation: this.confirmation,
        question: `¿Está seguro que desea eliminar el Usuario ${this.IdUser}?`,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.confirmation = result;
      if (this.confirmation) {
        //this._userService.deleteUser(0);
        this.back();
      }
    });
  }

  searchEmployee(): void {
    const dialogRef = this._dialog.open(SearchModalComponent, {
      width: '650px',
      data: {
        idEmployee: this.idEmployee,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.idEmployee = result;
      if (this.idEmployee) {
        const employee: Employee|undefined = this._employeeService.getEmployeeById(
          this.idEmployee
        );
        console.log(employee);

        this.nameEmployee = employee !== undefined ? employee.FirstName + ' ' + employee.LastName : "";
      }
    });
  }
}
