import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  loading: boolean = false;

  constructor(private fb: FormBuilder,
    private _snackBar: MatSnackBar,
    private router: Router) { 
    this.form = this.fb.group({
      user: ['', Validators.required],
      pass: ['', Validators.required]
    })
  }

  ngOnInit(): void {
  }

  login() {
    const user = this.form.value.user;
    const pass = this.form.value.pass;

    if(user == 'jlre' && pass == '123'){
      this.fakeLoading();
    } else {
      this.errorLogin();
      this.form.reset();
    }
  }

  errorLogin() {
    this._snackBar.open('Usuario y/o contraseña inválidos.', '', {
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
      duration: 3000
    });
  }

  fakeLoading() {
this.loading=true;
setTimeout(() => {
  this.router.navigate(['dashboard'])
}, (3000));
  }
}
