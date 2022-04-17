import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { UserProfile } from 'src/app/interfaces/user-profile';
import { ConfirmationModalComponent } from 'src/app/pages/modals/confirmation-modal/confirmation-modal.component';
import { UserProfileService } from 'src/app/services/user-profile.service';

@Component({
  selector: 'app-user-profile-add',
  templateUrl: './user-profile-add.component.html',
  styleUrls: ['./user-profile-add.component.css']
})
export class UserProfileAddComponent implements OnInit {
  form: FormGroup;
  listUserProfiles: UserProfile[] = [];
  IdUserProfile: string = '';
  readonlyOption: boolean = false;
  confirmation: boolean = false;

  constructor(
    private _UserProfileService: UserProfileService,
    private _formBuilder: FormBuilder,
    private _snackBar: MatSnackBar,
    private _router: Router,
    private _route: ActivatedRoute,
    public _dialog: MatDialog
  ) {
    this.form = this._formBuilder.group({
      Id: ['', Validators.required],
      Description: ['', Validators.required],
      State: [''],
    });
  }

  ngOnInit(): void {
    this.initParams();
  }

  initParams(): void {
    this._route.queryParams.subscribe((params) => {
      if (params && params['id']) {
        this.IdUserProfile = params['id'];
        const UserProfile: UserProfile[] = this.getUserProfile(this.IdUserProfile);
        this.form.setValue({
          Id: UserProfile[0].Id,
          Description: UserProfile[0].Description,
          State: UserProfile[0].State,
        });
      }
      if (params && params['edit']) {
        this.readonlyOption = params['edit'] !== '1' ? true : false;
      }
    });
  }

  loadUserProfiles() {
    this.listUserProfiles = this._UserProfileService.getUserProfiles();
  }

  getUserProfile(id: string) {
    return this._UserProfileService.getUserProfileById(id);
  }

  addUserProfile() {
    const UserProfile: UserProfile = {
      Id: this.form.value.Id,
      Description: this.form.value.Description,
      State: this.form.value.State,
      CreationDate: new Date().toLocaleDateString(),
      CreationUser: this.form.value.CreationUser,
    };

    this._UserProfileService.addUserProfile(UserProfile);
    this.back();
    this._snackBar.open('El Perfil de usuario fue registrado con éxito.', '', {
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
      duration: 1500,
    });
  }

  back() {
    this._router.navigate(['/user-profile-list']);
  }

  deleteUserProfile(): void {
    const dialogRef = this._dialog.open(ConfirmationModalComponent, {
      width: '350px',
      data: {
        confirmation: this.confirmation,
        question: `¿Está seguro que desea eliminar el Perfil de usuario ${this.IdUserProfile}?`,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.confirmation = result;
      if (this.confirmation) {
        //this._UserProfileService.deleteUserProfile(0);
        this.back();
      }
    });
  }
}
