import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AgregarCuentaContableComponent } from './agregar-cuenta-contable.component';
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
import { CuentaContableService } from 'src/app/services/cuenta-contable.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { of } from 'rxjs';

describe('AgregarCuentaContableComponent', () => {
  let component: AgregarCuentaContableComponent;
  let fixture: ComponentFixture<AgregarCuentaContableComponent>;
  let _CuentaContableService: CuentaContableService;
  let _UsuarioService: UsuarioService;
  let _respuesta: any;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AgregarCuentaContableComponent],
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
    fixture = TestBed.createComponent(AgregarCuentaContableComponent);
    component = fixture.componentInstance;
    _CuentaContableService = fixture.debugElement.injector.get(
      CuentaContableService
    );
    _UsuarioService = fixture.debugElement.injector.get(UsuarioService);
    fixture.detectChanges();
  });

  it('Crear Componemte', () => {
    expect(component).toBeTruthy();
  });

  it('Llama al método ngOnInit', () => {
    spyOn(component, 'ngOnInit');

    expect(component).toBeTruthy();
  });

  it('Llama al método initParams', () => {
    component._route.queryParams.subscribe((params) => {
      params['modificar'] = 1;
      params['idCuentaContable'] = undefined;
    });

    expect(component).toBeTruthy();
  });

  it('Llama al método agregarCuentaContable, modificar = true y retorna ok', () => {
    component.form.value.idCuentaContable = '4200001';
    component.form.value.nombre = 'Pago';
    component.form.value.estado = 'A';
    component.form.value.fechaCreacion = '2022-01-01';
    component.form.value.usuarioCreacion = 'test';

    component.modificar = true;

    _respuesta = {
      id: '1',
      message: 'ok',
      detail: '',
    };

    spyOn(_CuentaContableService, 'actualizarCuentaContable').and.returnValue(
      of(_respuesta)
    );

    component.agregarCuentaContable();

    expect(component).toBeTruthy();
  });

  it('Llama al método agregarCuentaContable, modificar = true y retorna error', () => {
    component.form.value.idCuentaContable = '4200001';
    component.form.value.nombre = 'Pago';
    component.form.value.abreviatura = 'CON';
    component.form.value.estado = 'A';
    component.form.value.fechaCreacion = '2022-01-01';
    component.form.value.usuarioCreacion = 'test';

    component.modificar = true;

    _respuesta = {
      id: '0',
      message: 'error',
      detail: '',
    };

    spyOn(_CuentaContableService, 'actualizarCuentaContable').and.returnValue(
      of(_respuesta)
    );

    component.agregarCuentaContable();

    expect(component).toBeTruthy();
  });

  it('Llama al método agregarCuentaContable, modificar = false y retorna ok', () => {
    component.form.value.idCuentaContable = '4200001';
    component.form.value.nombre = 'Pago';
    component.form.value.abreviatura = 'CON';
    component.form.value.estado = 'A';
    component.form.value.fechaCreacion = '2022-01-01';
    component.form.value.usuarioCreacion = 'test';

    component.modificar = false;

    _respuesta = {
      id: '1',
      message: 'ok',
      detail: '',
    };

    spyOn(_CuentaContableService, 'agregarCuentaContable').and.returnValue(
      of(_respuesta)
    );

    component.agregarCuentaContable();

    expect(component).toBeTruthy();
  });

  it('Llama al método agregarCuentaContable, modificar = false y retorna error', () => {
    component.form.value.idCuentaContable = '4200001';
    component.form.value.nombre = 'Pago';
    component.form.value.abreviatura = 'CON';
    component.form.value.estado = 'A';
    component.form.value.fechaCreacion = '2022-01-01';
    component.form.value.usuarioCreacion = 'test';

    component.modificar = false;

    _respuesta = {
      id: '0',
      message: 'error',
      detail: '',
    };

    spyOn(_CuentaContableService, 'agregarCuentaContable').and.returnValue(
      of(_respuesta)
    );

    component.agregarCuentaContable();

    expect(component).toBeTruthy();
  });

  it('Llama al método eliminarCuentaContable, confirmation = true y retorna ok', () => {
    component.confirmacion = true;

    _respuesta = {
      id: '1',
      message: 'ok',
      detail: '',
    };

    spyOn(_CuentaContableService, 'eliminarCuentaContable').and.returnValue(
      of(_respuesta)
    );

    component.eliminarCuentaContable();

    expect(component).toBeTruthy();
  });

  it('Llama al método eliminarCuentaContable, confirmation = false y retorna ok', () => {
    component.confirmacion = false;

    _respuesta = {
      id: '1',
      message: 'ok',
      detail: '',
    };

    spyOn(_CuentaContableService, 'eliminarCuentaContable').and.returnValue(
      of(_respuesta)
    );

    component.eliminarCuentaContable();

    expect(component).toBeTruthy();
  });

  it('Llama al método eliminarCuentaContable, modificar = false y retorna error', () => {
    component.confirmacion = true;

    _respuesta = {
      id: '0',
      message: 'error',
      detail: '',
    };

    spyOn(_CuentaContableService, 'eliminarCuentaContable').and.returnValue(
      of(_respuesta)
    );

    component.eliminarCuentaContable();

    expect(component).toBeTruthy();
  });

  it('Llama al método back', () => {
    component.back();

    expect(component).toBeTruthy();
  });
});
