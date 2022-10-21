import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AgregarFormaPagoComponent } from './agregar-forma-pago.component';
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
import { FormaPagoService } from 'src/app/services/forma-pago.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { of } from 'rxjs';

describe('AgregarFormaPagoComponent', () => {
  let component: AgregarFormaPagoComponent;
  let fixture: ComponentFixture<AgregarFormaPagoComponent>;
  let _FormaPagoService: FormaPagoService;
  let _UsuarioService: UsuarioService;
  let _respuesta: any;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AgregarFormaPagoComponent],
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
    fixture = TestBed.createComponent(AgregarFormaPagoComponent);
    component = fixture.componentInstance;
    _FormaPagoService = fixture.debugElement.injector.get(FormaPagoService);
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
      params['idFormaPago'] = undefined;
    });

component.initParams();

    expect(component).toBeTruthy();
  });

  it('Llama al método consultarFormaPago', () => {
    spyOn(_FormaPagoService, 'listarFormaPagoPorId');

    component.consultarFormaPago('CON');

    expect(component).toBeTruthy();
  });

  it('Llama al método agregarFormaPago, modificar = true y retorna ok', () => {
    component.form.value.idFormaPago = 'CON';
    component.form.value.descripcion = 'Contado';
    component.form.value.abreviatura = 'CON';
    component.form.value.estado = 'A';
    component.form.value.fechaCreacion = '2022-01-01';
    component.form.value.usuarioCreacion = 'test';

    component.modificar = true;

    _respuesta = {
      id: '1',
      message: 'ok',
      detail: '',
    };

    spyOn(_FormaPagoService, 'actualizarFormaPago').and.returnValue(
      of(_respuesta)
    );

    component.agregarFormaPago();

    expect(component).toBeTruthy();
  });

  it('Llama al método agregarFormaPago, modificar = true y retorna error', () => {
    component.form.value.idFormaPago = 'CON';
    component.form.value.descripcion = 'Contado';
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

    spyOn(_FormaPagoService, 'actualizarFormaPago').and.returnValue(
      of(_respuesta)
    );

    component.agregarFormaPago();

    expect(component).toBeTruthy();
  });

  it('Llama al método agregarFormaPago, modificar = false y retorna ok', () => {
    component.form.value.idFormaPago = 'CON';
    component.form.value.descripcion = 'Contado';
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

    spyOn(_FormaPagoService, 'agregarFormaPago').and.returnValue(
      of(_respuesta)
    );

    component.agregarFormaPago();

    expect(component).toBeTruthy();
  });

  it('Llama al método agregarFormaPago, modificar = false y retorna error', () => {
    component.form.value.idFormaPago = 'CON';
    component.form.value.descripcion = 'Contado';
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

    spyOn(_FormaPagoService, 'agregarFormaPago').and.returnValue(
      of(_respuesta)
    );

    component.agregarFormaPago();

    expect(component).toBeTruthy();
  });

  it('Llama al método eliminarFormaPago, confirmation = true y retorna ok', () => {
    component.confirmation = true;

    _respuesta = {
      id: '1',
      message: 'ok',
      detail: '',
    };

    spyOn(_FormaPagoService, 'eliminarFormaPago').and.returnValue(
      of(_respuesta)
    );

    component.eliminarFormaPago();

    expect(component).toBeTruthy();
  });

  it('Llama al método eliminarFormaPago, confirmation = false y retorna ok', () => {
    component.confirmation = false;

    _respuesta = {
      id: '1',
      message: 'ok',
      detail: '',
    };

    spyOn(_FormaPagoService, 'eliminarFormaPago').and.returnValue(
      of(_respuesta)
    );

    component.eliminarFormaPago();

    expect(component).toBeTruthy();
  });

  it('Llama al método eliminarFormaPago, modificar = false y retorna error', () => {
    component.confirmation = true;

    _respuesta = {
      id: '0',
      message: 'error',
      detail: '',
    };

    spyOn(_FormaPagoService, 'eliminarFormaPago').and.returnValue(
      of(_respuesta)
    );

    component.eliminarFormaPago();

    expect(component).toBeTruthy();
  });

  it('Llama al método back', () => {
    component.back();

    expect(component).toBeTruthy();
  });
});
