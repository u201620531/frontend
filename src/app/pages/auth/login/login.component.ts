// import { Component, OnInit } from '@angular/core';
// import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import { MatSnackBar } from '@angular/material/snack-bar';
// import { Router } from '@angular/router';

// @Component({
//   selector: 'app-login',
//   templateUrl: './login.component.html',
//   styleUrls: ['./login.component.css']
// })
// export class LoginComponent implements OnInit {
//   form: FormGroup;
//   loading: boolean = false;

//   constructor(private fb: FormBuilder,
//     private _snackBar: MatSnackBar,
//     private router: Router) {
//     this.form = this.fb.group({
//       Usuario: ['', Validators.required],
//       pass: ['', Validators.required]
//     })
//   }

//   ngOnInit(): void {
//   }

//   login() {
//     const Usuario = this.form.value.Usuario;
//     const pass = this.form.value.pass;

//     if(Usuario == 'jlre' && pass == '123'){
//       this.fakeLoading();
//     } else {
//       this.errorLogin();
//       this.form.reset();
//     }
//   }

//   errorLogin() {
//     this._snackBar.open('Usuario y/o contraseña inválidos.', '', {
//       horizontalPosition: 'center',
//       verticalPosition: 'bottom',
//       duration: 3000
//     });
//   }

//   fakeLoading() {
// this.loading=true;
// setTimeout(() => {
//   this.router.navigate(['dashboard'])
// }, (3000));
//   }
// }

import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { UsuarioService } from 'src/app/services/usuario.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { accion_mensaje } from 'src/shared/config';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  loginForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string = '/dashboard';
  error = '';

  constructor(
    private formBuilder: FormBuilder,
    private _snackBar: MatSnackBar,
    private _router: Router,
    private _route: ActivatedRoute,
    private _usuarioService: UsuarioService
  ) {
    // redirect to home if already logged in
    if (this._usuarioService.currentUsuarioValue) {
      this._router.navigate(['/']);
    }
    this.loginForm = this.formBuilder.group({
      codigoUsuario: ['', Validators.required],
      contrasena: ['', Validators.required],
    });
  }

  async onSubmit() {
    this.submitted = true;

    if (this.loginForm.invalid) {
      return;
    }

    this.loading = true;
    const result =
      await this._usuarioService.listarUsuarioPorCodigoUsuarioyContrasena(
        this.loginForm.value.codigoUsuario,
        this.loginForm.value.contrasena
      );

    if (result.idEmpleado !== '') {
      this._router.navigate([this.returnUrl]);
    } else {
      this.error = 'Usuario no existe';
      this._snackBar.open('Usuario no existe', accion_mensaje.modificar_valor_ingresado, {
        horizontalPosition: 'center',
        verticalPosition: 'bottom',
        duration: 3000,
      });
      this.loading = false;
    }
  }
}
