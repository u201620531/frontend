import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { WayPay } from 'src/app/interfaces/way-pay';
import { ConfirmationModalComponent } from 'src/app/pages/modals/confirmation-modal/confirmation-modal.component';
import { WayPayService } from 'src/app/services/way-pay.service';

@Component({
  selector: 'app-way-pay-add',
  templateUrl: './way-pay-add.component.html',
  styleUrls: ['./way-pay-add.component.css'],
})
export class WayPayAddComponent implements OnInit {
  form: FormGroup;
  listWayPays: WayPay[] = [];
  IdWayPay: string = '';
  readonlyOption: boolean = false;
  confirmation: boolean = false;
edit:boolean=false;

  constructor(
    private _WayPayService: WayPayService,
    private _formBuilder: FormBuilder,
    private _snackBar: MatSnackBar,
    private _router: Router,
    private _route: ActivatedRoute,
    public _dialog: MatDialog
  ) {
    this.form = this._formBuilder.group({
      id: ['', Validators.required],
      description: ['', Validators.required],
      abbreviation: ['', Validators.required],
      status: [''],
      creationDate: [''],
      creationUser: ['']
    });
  }

  ngOnInit(): void {
    this.initParams();
  }

  initParams(): void {
    this._route.queryParams.subscribe((params) => {
      if (params && params['id']) {
        this.IdWayPay = params['id'];
        this._WayPayService
          .getWayPayById(this.IdWayPay)
          .subscribe((res: any) => {
            this.form.setValue({
              id: res.id,
              description: res.description,
              abbreviation: res.abbreviation,
              status: res.status,
              creationDate: res.creationDate,
              creationUser: res.creationUser
            });
            this.edit = true;
          });
      }
      if (params && params['edit']) {
        this.readonlyOption = params['edit'] !== '1' ? true : false;
      }
    });
  }

  getWayPay(id: string) {
    return this._WayPayService.getWayPayById(id);
  }

  addWayPay() {
    const creationUser = 'jlre';
    const wayPay: WayPay = {
      id: this.form.value.id,
      description: this.form.value.description,
      abbreviation: this.form.value.abbreviation,
      status: 'A',
      creationDate: new Date().toLocaleDateString(),
      creationUser: creationUser,
    };

    try {
      if (this.edit) {
        this._WayPayService.editWayPay(wayPay).subscribe(
          (res) => {
            const result: any = res;
            this.back();
            this._snackBar.open(result.message, '', {
              horizontalPosition: 'center',
              verticalPosition: 'bottom',
              duration: 1500,
            });
          },
          (err) => {
            console.log(err);
          }
        );
      } else {
        console.log('add');
        this._WayPayService.addWayPay(wayPay).subscribe(
          (res) => {
            const result: any = res;
            this.back();
            this._snackBar.open(result.message, '', {
              horizontalPosition: 'center',
              verticalPosition: 'bottom',
              duration: 1500,
            });
          },
          (err) => {
            console.log(err);
          }
        );
      }
    } catch (error) {
      console.log(error);
    }
  }

  back() {
    this._router.navigate(['/dashboard/way-pay-list']);
  }

  deleteWayPay(): void {
    const dialogRef = this._dialog.open(ConfirmationModalComponent, {
      width: '350px',
      data: {
        confirmation: this.confirmation,
        question: `¿Está seguro que desea eliminar la Forma de pago ${this.IdWayPay}?`,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.confirmation = result;
      if (this.confirmation) {
        //this._WayPayService.deleteWayPay(0);
        this.back();
      }
    });
  }
}
