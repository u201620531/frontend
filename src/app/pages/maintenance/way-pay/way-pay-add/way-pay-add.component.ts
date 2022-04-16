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

  constructor(
    private _WayPayService: WayPayService,
    private _formBuilder: FormBuilder,
    private _snackBar: MatSnackBar,
    private _router: Router,
    private _route: ActivatedRoute,
    public _dialog: MatDialog
  ) {
    this.form = this._formBuilder.group({
      Id: ['', Validators.required],
      Description: ['', Validators.required],
      Abbreviation: ['', Validators.required],
      State: [''],
    });
  }

  ngOnInit(): void {
    this.initParams();
  }

  initParams(): void {
    this._route.queryParams.subscribe((params) => {
      if (params && params['id']) {
        this.IdWayPay = params['id'];
        const WayPay: WayPay[] = this.getWayPay(this.IdWayPay);
        this.form.setValue({
          Id: WayPay[0].Id,
          Description: WayPay[0].Description,
          Abbreviation: WayPay[0].Abbreviation,
          State: WayPay[0].State,
        });
      }
      if (params && params['edit']) {
        this.readonlyOption = params['edit'] !== '1' ? true : false;
      }
    });
  }

  loadWayPays() {
    this.listWayPays = this._WayPayService.getWayPays();
  }

  getWayPay(id: string) {
    return this._WayPayService.getWayPayById(id);
  }

  addWayPay() {
    const WayPay: WayPay = {
      Id: this.form.value.Id,
      Description: this.form.value.Description,
      Abbreviation: this.form.value.Abbreviation,
      State: this.form.value.State,
      CreationDate: new Date().toLocaleDateString(),
      CreationUser: this.form.value.CreationUser,
    };

    this._WayPayService.addWayPay(WayPay);
    this.back();
    this._snackBar.open('La Forma de pago fue registrada con éxito.', '', {
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
      duration: 1500,
    });
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
