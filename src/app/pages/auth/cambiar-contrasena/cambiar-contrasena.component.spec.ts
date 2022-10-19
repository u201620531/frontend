import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CambiarContrasenaComponent } from './cambiar-contrasena.component';
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

describe('CambiarContrasenaComponent', () => {
  let component: CambiarContrasenaComponent;
  let fixture: ComponentFixture<CambiarContrasenaComponent>;
  let _UsuarioService: UsuarioService;
  let _respuesta: any;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CambiarContrasenaComponent],
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
    fixture = TestBed.createComponent(CambiarContrasenaComponent);
    component = fixture.componentInstance;
    _UsuarioService = fixture.debugElement.injector.get(UsuarioService);
    fixture.detectChanges();
  });

  it('Crear Componemte', () => {
    expect(component).toBeTruthy();
  });

  it('Llama al método ngOnInit', () => {
    spyOn(component, 'initParams');

    component.ngOnInit();

    expect(component).toBeTruthy();
  });

  it('Llama al método initParams', () => {
    _UsuarioService.currentUsuarioValue.codigoUsuario = 'test';
    _respuesta = {
      idEmpleado: '1',
      codigoUsuario: 'ok',
    };

    spyOn(_UsuarioService, 'listarUsuarioPorCodigoUsuario').and.returnValue(
      of(_respuesta)
    );

    component.initParams();

    expect(component).toBeTruthy();
  });

  it('Llama al método actualizarContrasena con contrasena diferente', () => {
    component.form.value.contrasena = '111111';
    component.form.value.confirmarContrasena = '0000';

    _respuesta = {
      id: '1',
      message: 'ok',
      detail: '',
    };

    component.actualizarContrasena();

    expect(component).toBeTruthy();
  });

  it('Llama al método actualizarContrasena con contrasena valida', () => {
    component.form.value.idEmpleado = '00001';
    component.form.value.codigoUsuario = 'test';
    component.form.value.contrasena = '111111';
    component.form.value.confirmarContrasena = '111111';
    component.form.value.idPerfilUsuario = 'P01';
    component.form.value.estado = 'A';
    component.form.value.fechaCreacion = '2022-01-01';
    component.form.value.usuarioCreacion = 'test';

    _respuesta = {
      id: '1',
      message: 'ok',
      detail: '',
    };

    spyOn(_UsuarioService, 'actualizarUsuario').and.returnValue(of(_respuesta));

    component.actualizarContrasena();

    expect(component).toBeTruthy();
  });

  it('Llama al método actualizarContrasena con contrasena valida y retorna error', () => {
    component.form.value.idEmpleado = '00001';
    component.form.value.codigoUsuario = 'test';
    component.form.value.contrasena = '111111';
    component.form.value.confirmarContrasena = '111111';
    component.form.value.idPerfilUsuario = 'P01';
    component.form.value.estado = 'A';
    component.form.value.fechaCreacion = '2022-01-01';
    component.form.value.usuarioCreacion = 'test';

    _respuesta = {
      id: '0',
      message: 'error',
      detail: '',
    };

    spyOn(_UsuarioService, 'actualizarUsuario').and.returnValue(of(_respuesta));

    component.actualizarContrasena();

    expect(component).toBeTruthy();
  });

  it('Llama al método back', () => {
    component.back();

    expect(component).toBeTruthy();
  });
});
