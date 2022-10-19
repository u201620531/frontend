import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginComponent } from './login.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { RouterTestingModule } from '@angular/router/testing';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { UsuarioService } from 'src/app/services/usuario.service';
import { of } from 'rxjs';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let _UsuarioService: UsuarioService;
  let _respuesta: any;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports: [
        HttpClientModule,
        ReactiveFormsModule,
        FormsModule,
        MatSnackBarModule,
        RouterModule,
        RouterTestingModule,
        MatDialogModule,
        MatSelectModule,
        MatFormFieldModule,
        MatInputModule,
        BrowserAnimationsModule,
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    _UsuarioService = fixture.debugElement.injector.get(UsuarioService);
    fixture.detectChanges();
  });

  it('Crear Componemte', () => {
    expect(component).toBeTruthy();
  });

  it('Llama al método onSubmit y retorna idEmpleado', () => {
    _respuesta = {
      idEmpleado: '000001',
      codigoUsuario: 'test',
    };

    spyOn(
      _UsuarioService,
      'listarUsuarioPorCodigoUsuarioyContrasena'
    ).and.callFake(function () {
      return _respuesta;
    });

    component.onSubmit();

    expect(component).toBeTruthy();
  });

  it('Llama al método onSubmit y retorna idEmpleado vacío', () => {
    _respuesta = {
      idEmpleado: '',
      codigoUsuario: 'test',
    };

    spyOn(
      _UsuarioService,
      'listarUsuarioPorCodigoUsuarioyContrasena'
    ).and.callFake(function () {
      return _respuesta;
    });

    component.onSubmit();

    expect(component).toBeTruthy();
  });

  it('Llama al método onSubmit y retirna respuesta vacia', () => {
    _respuesta = undefined;

    spyOn(
      _UsuarioService,
      'listarUsuarioPorCodigoUsuarioyContrasena'
    ).and.callFake(function () {
      return _respuesta;
    });

    component.onSubmit();

    expect(component).toBeTruthy();
  });
});
