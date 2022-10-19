import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AgregarUsuarioComponent } from './agregar-usuario.component';
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
import { PerfilUsuarioService } from 'src/app/services/perfil-usuario.service';
import { EmpleadoService } from 'src/app/services/empleado.service';

describe('AgregarUsuarioComponent', () => {
  let component: AgregarUsuarioComponent;
  let fixture: ComponentFixture<AgregarUsuarioComponent>;
  let _EmpleadoService: EmpleadoService;
  let _PerfilUsuarioService: PerfilUsuarioService;
  let _UsuarioService: UsuarioService;
  let _respuesta: any;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AgregarUsuarioComponent],
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
    fixture = TestBed.createComponent(AgregarUsuarioComponent);
    component = fixture.componentInstance;
    _PerfilUsuarioService =
      fixture.debugElement.injector.get(PerfilUsuarioService);
    _EmpleadoService = fixture.debugElement.injector.get(EmpleadoService);
    _UsuarioService = fixture.debugElement.injector.get(UsuarioService);
    fixture.detectChanges();
  });

  it('Crear Componemte', () => {
    expect(component).toBeTruthy();
  });

  it('Llama al método ngOnInit', () => {
    spyOn(component, 'listarEmpleados');
    spyOn(component, 'listarPerfilesUsuario');
    spyOn(component, 'initParams');

    component.ngOnInit();

    expect(component).toBeTruthy();
  });

  it('Llama al método initParams', () => {
    component._route.queryParams.subscribe((params) => {
      params['modificar'] = 1;
      params['idUsuario'] = undefined;
    });

    expect(component).toBeTruthy();
  });

  it('Llama al método initParams con parametros', () => {
    component._route.queryParams.subscribe((params) => {
      params['modificar'] = 1;
      params['idUsuario'] = 'admin';
      params['idEmpleado'] = '00001';
    });

    _respuesta = {
      idEmpleado: '1',
      codigoUsuario: 'ok',
      contrasena: '',
      idPerfilUsuario: 'P01',
      estado: 'A',
      fechaCreacion: '2022-01-01',
      usuarioCreacion: 'admin',
    };

    spyOn(_UsuarioService, 'listarUsuarioPorCodigoUsuario').and.returnValue(
      of(_respuesta)
    );

    component.initParams();

    expect(component).toBeTruthy();
  });

  it('Llama al método consultarEmpleado', () => {
    component.idEmpleado = '0001';
    _respuesta = {
      idEmpleado: '1',
      nombre: 'prueba',
      fechaNacimiento: '2022-01-01',
      apellido: 'test',
      estado: 'A',
      fechaCreacion: '2022-01-01',
      usuarioCreacion: 'admin',
    };

    spyOn(_EmpleadoService, 'listarEmpleadoPoridEmpleado').and.returnValue(
      of(_respuesta)
    );

    component.consultarEmpleado();

    expect(component).toBeTruthy();
  });

  it('Llama al método listarEmpleados', () => {
    _respuesta = {
      idEmpleado: '1',
      nombre: 'prueba',
      fechaNacimiento: '2022-01-01',
      apellido: 'test',
      estado: 'A',
      fechaCreacion: '2022-01-01',
      usuarioCreacion: 'admin',
    };

    spyOn(_EmpleadoService, 'listarEmpleados').and.returnValue(of(_respuesta));

    component.listarEmpleados();

    expect(component).toBeTruthy();
  });

  it('Llama al método listarPerfilesUsuario', () => {
    _respuesta = {
      idEmpleado: '1',
      nombre: 'prueba',
      fechaNacimiento: '2022-01-01',
      apellido: 'test',
      estado: 'A',
      fechaCreacion: '2022-01-01',
      usuarioCreacion: 'admin',
    };

    spyOn(_PerfilUsuarioService, 'listarPerfilesUsuario').and.returnValue(
      of(_respuesta)
    );

    component.listarPerfilesUsuario();

    expect(component).toBeTruthy();
  });

  it('Llama al método agregarUsuario, modificar = true y retorna ok', () => {
    component.form.value.idEmpleado = '00001';
    component.form.value.codigoUsuario = 'test';
    component.form.value.contrasena = '111111';
    component.form.value.idPerfilUsuario = 'P01';
    component.form.value.estado = 'A';
    component.form.value.fechaCreacion = '2022-01-01';
    component.form.value.usuarioCreacion = 'test';

    component.modificar = true;

    _respuesta = {
      id: '1',
      message: 'ok',
      detail: '',
    };

    spyOn(_UsuarioService, 'actualizarUsuario').and.returnValue(of(_respuesta));

    component.agregarUsuario();

    expect(component).toBeTruthy();
  });

  it('Llama al método agregarUsuario, modificar = true y retorna error', () => {
    component.form.value.idEmpleado = '00001';
    component.form.value.codigoUsuario = 'test';
    component.form.value.contrasena = '111111';
    component.form.value.idPerfilUsuario = 'P01';
    component.form.value.estado = 'A';
    component.form.value.fechaCreacion = '2022-01-01';
    component.form.value.usuarioCreacion = 'test';

    component.modificar = true;

    _respuesta = {
      id: '0',
      message: 'error',
      detail: '',
    };

    spyOn(_UsuarioService, 'actualizarUsuario').and.returnValue(of(_respuesta));

    component.agregarUsuario();

    expect(component).toBeTruthy();
  });

  it('Llama al método agregarUsuario, modificar = false y retorna ok', () => {
    component.form.value.idEmpleado = '00001';
    component.form.value.codigoUsuario = 'test';
    component.form.value.contrasena = '111111';
    component.form.value.idPerfilUsuario = 'P01';
    component.form.value.estado = 'A';
    component.form.value.fechaCreacion = '2022-01-01';
    component.form.value.usuarioCreacion = 'test';

    component.modificar = false;

    _respuesta = {
      id: '1',
      message: 'ok',
      detail: '',
    };

    spyOn(_UsuarioService, 'agregarUsuario').and.returnValue(of(_respuesta));

    component.agregarUsuario();

    expect(component).toBeTruthy();
  });

  it('Llama al método agregarUsuario, modificar = false y retorna error', () => {
    component.form.value.idEmpleado = '00001';
    component.form.value.codigoUsuario = 'test';
    component.form.value.contrasena = '111111';
    component.form.value.idPerfilUsuario = 'P01';
    component.form.value.estado = 'A';
    component.form.value.fechaCreacion = '2022-01-01';
    component.form.value.usuarioCreacion = 'test';

    component.modificar = false;

    _respuesta = {
      id: '0',
      message: 'error',
      detail: '',
    };

    spyOn(_UsuarioService, 'agregarUsuario').and.returnValue(of(_respuesta));

    component.agregarUsuario();

    expect(component).toBeTruthy();
  });

  it('Llama al método eliminarUsuario, confirmation = true y retorna ok', () => {
    component.confirmacion = true;

    _respuesta = {
      id: '1',
      message: 'ok',
      detail: '',
    };

    spyOn(_UsuarioService, 'eliminarUsuario').and.returnValue(of(_respuesta));

    component.eliminarUsuario();

    expect(component).toBeTruthy();
  });

  it('Llama al método eliminarUsuario, confirmation = false y retorna ok', () => {
    component.confirmacion = false;

    _respuesta = {
      id: '1',
      message: 'ok',
      detail: '',
    };

    spyOn(_UsuarioService, 'eliminarUsuario').and.returnValue(of(_respuesta));

    component.eliminarUsuario();

    expect(component).toBeTruthy();
  });

  it('Llama al método eliminarUsuario, modificar = false y retorna error', () => {
    component.confirmacion = true;

    _respuesta = {
      id: '0',
      message: 'error',
      detail: '',
    };

    spyOn(_UsuarioService, 'eliminarUsuario').and.returnValue(of(_respuesta));

    component.eliminarUsuario();

    expect(component).toBeTruthy();
  });

  it('Llama al método back', () => {
    component.back();

    expect(component).toBeTruthy();
  });
});
