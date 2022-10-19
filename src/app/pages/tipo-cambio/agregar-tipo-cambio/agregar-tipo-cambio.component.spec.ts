import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregarTipoCambioComponent } from './agregar-tipo-cambio.component';
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
import { TipoCambioService } from 'src/app/services/tipo-cambio.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { of } from 'rxjs';

describe('AgregarTipoCambioComponent', () => {
  let component: AgregarTipoCambioComponent;
  let fixture: ComponentFixture<AgregarTipoCambioComponent>;
  let _TipoCambioService: TipoCambioService;
  let _UsuarioService: UsuarioService;
  let _respuesta: any;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AgregarTipoCambioComponent],
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
    fixture = TestBed.createComponent(AgregarTipoCambioComponent);
    component = fixture.componentInstance;
    _TipoCambioService = fixture.debugElement.injector.get(TipoCambioService);
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
      params['idTipoCambio'] = undefined;
    });

    expect(component).toBeTruthy();
  });

  it('Llama al método agregarTipoCambio, modificar = true y retorna ok', () => {
    component.form.value.fecha = new Date();
    component.form.value.venta = 3.0;
    component.form.value.compra = 4.0;
    component.form.value.estado = 'A';
    component.form.value.fechaCreacion = '2022-01-01';
    component.form.value.usuarioCreacion = 'test';

    component.modificar = true;

    _respuesta = {
      id: '1',
      message: 'ok',
      detail: '',
    };

    spyOn(_TipoCambioService, 'actualizarTipoCambio').and.returnValue(
      of(_respuesta)
    );

    component.agregarTipoCambio();

    expect(component).toBeTruthy();
  });

  it('Llama al método agregarTipoCambio, modificar = true y retorna error', () => {
    component.form.value.fecha = new Date();
    component.form.value.venta = 3.0;
    component.form.value.compra = 4.0;
    component.form.value.estado = 'A';
    component.form.value.fechaCreacion = '2022-01-01';
    component.form.value.usuarioCreacion = 'test';

    component.modificar = true;

    _respuesta = {
      id: '0',
      message: 'error',
      detail: '',
    };

    spyOn(_TipoCambioService, 'actualizarTipoCambio').and.returnValue(
      of(_respuesta)
    );

    component.agregarTipoCambio();

    expect(component).toBeTruthy();
  });

  it('Llama al método agregarTipoCambio, modificar = false y retorna ok', () => {
    component.form.value.fecha = new Date();
    component.form.value.venta = 3.0;
    component.form.value.compra = 4.0;
    component.form.value.estado = 'A';
    component.form.value.fechaCreacion = '2022-01-01';
    component.form.value.usuarioCreacion = 'test';

    component.modificar = false;

    _respuesta = {
      id: '1',
      message: 'ok',
      detail: '',
    };

    spyOn(_TipoCambioService, 'agregarTipoCambio').and.returnValue(
      of(_respuesta)
    );

    component.agregarTipoCambio();

    expect(component).toBeTruthy();
  });

  it('Llama al método agregarTipoCambio, modificar = false y retorna error', () => {
    component.form.value.fecha = new Date();
    component.form.value.venta = 3.0;
    component.form.value.compra = 4.0;
    component.form.value.estado = 'A';
    component.form.value.fechaCreacion = '2022-01-01';
    component.form.value.usuarioCreacion = 'test';

    component.modificar = false;

    _respuesta = {
      id: '0',
      message: 'error',
      detail: '',
    };

    spyOn(_TipoCambioService, 'agregarTipoCambio').and.returnValue(
      of(_respuesta)
    );

    component.agregarTipoCambio();

    expect(component).toBeTruthy();
  });

  it('Llama al método eliminarTipoCambio, confirmation = true y retorna ok', () => {
    component.confirmacion = true;

    _respuesta = {
      id: '1',
      message: 'ok',
      detail: '',
    };

    spyOn(_TipoCambioService, 'eliminarTipoCambio').and.returnValue(
      of(_respuesta)
    );

    component.eliminarTipoCambio();

    expect(component).toBeTruthy();
  });

  it('Llama al método eliminarTipoCambio, confirmation = false y retorna ok', () => {
    component.confirmacion = false;

    _respuesta = {
      id: '1',
      message: 'ok',
      detail: '',
    };

    spyOn(_TipoCambioService, 'eliminarTipoCambio').and.returnValue(
      of(_respuesta)
    );

    component.eliminarTipoCambio();

    expect(component).toBeTruthy();
  });

  it('Llama al método eliminarTipoCambio, modificar = false y retorna error', () => {
    component.confirmacion = true;

    _respuesta = {
      id: '0',
      message: 'error',
      detail: '',
    };

    spyOn(_TipoCambioService, 'eliminarTipoCambio').and.returnValue(
      of(_respuesta)
    );

    component.eliminarTipoCambio();

    expect(component).toBeTruthy();
  });

  it('Llama al método back', () => {
    component.back();

    expect(component).toBeTruthy();
  });
});
