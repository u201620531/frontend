import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregarProveedorComponent } from './agregar-proveedor.component';
import { ProveedorService } from 'src/app/services/proveedor.service';
import { SoporteService } from 'src/app/services/soporte.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { of } from 'rxjs';

describe('AgregarProveedorComponent', () => {
  let component: AgregarProveedorComponent;
  let fixture: ComponentFixture<AgregarProveedorComponent>;
  let _ProveedorService: ProveedorService;
  let _SoporteService: SoporteService;
  let _UsuarioService: UsuarioService;
  let _respuesta: any;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AgregarProveedorComponent],
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
    fixture = TestBed.createComponent(AgregarProveedorComponent);
    component = fixture.componentInstance;

    _ProveedorService = fixture.debugElement.injector.get(ProveedorService);
    _SoporteService = fixture.debugElement.injector.get(SoporteService);
    _UsuarioService = fixture.debugElement.injector.get(UsuarioService);

    fixture.detectChanges();
  });

  it('Crear Componemte', () => {
    component.idTipoProveedor = '';
    spyOn(component, 'listarTiposDocumento');
    spyOn(component, 'listarTiposProveedor');
    spyOn(component, 'initParams');

    expect(component).toBeTruthy();
  });

  it('Llama al método ngOnInit', () => {
    spyOn(component, 'ngOnInit');

    expect(component).toBeTruthy();
  });

  it('Llama al método initParams', () => {
    component._route.queryParams.subscribe((params) => {
      params['modificar'] = 1;
      params['idProveedor'] = undefined;
    });

    expect(component).toBeTruthy();
  });

  it('Llama al método listarTiposDocumento', () => {
    _respuesta = {
      idTipoDocumento: 'RUC',
      description: 'Registro',
    };
    spyOn(_SoporteService, 'listarSoporteById').and.returnValue(of(_respuesta));

    component.listarTiposDocumento();

    expect(component).toBeTruthy();
  });

  it('Llama al método listarTiposProveedor', () => {
    _respuesta = {
      idTipoDocumento: 'RUC',
      description: 'Registro',
    };
    spyOn(_SoporteService, 'listarSoporteById').and.returnValue(of(_respuesta));

    component.listarTiposProveedor();

    expect(component).toBeTruthy();
  });

  it('Llama al método agregarProveedor, modificar = true y retorna ok', () => {
    component.form.value.idProveedor = 'CON';
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

    spyOn(_ProveedorService, 'actualizarProveedor').and.returnValue(
      of(_respuesta)
    );

    component.agregarProveedor();

    expect(component).toBeTruthy();
  });

  it('Llama al método agregarProveedor, modificar = true y retorna error', () => {
    component.form.value.idProveedor = 'J000000001';
    component.form.value.nroDocumento = '1345678901';
    component.form.value.razonSocial = 'TEST SAC';
    component.form.value.nombreComercial = 'TESTS';
    component.form.value.email1 = 'test@prueba.com';
    component.form.value.email2 = '';
    component.form.value.idTipoProveedor = 'J';
    component.form.value.idTipoDocumento = 'RUC';
    component.form.value.direccion = 'Av. las flores 123';
    component.form.value.direccionFiscal = '';
    component.form.value.estado = 'A';
    component.form.value.fechaCreacion = '2022-01-01';
    component.form.value.usuarioCreacion = 'test';

    component.modificar = true;

    _respuesta = {
      id: '0',
      message: 'error',
      detail: '',
    };

    spyOn(_ProveedorService, 'actualizarProveedor').and.returnValue(
      of(_respuesta)
    );

    component.agregarProveedor();

    expect(component).toBeTruthy();
  });

  it('Llama al método agregarProveedor, modificar = false y retorna ok', () => {
    component.form.value.idProveedor = 'CON';
    component.form.value.nroDocumento = '1345678901';
    component.form.value.razonSocial = 'TEST SAC';
    component.form.value.nombreComercial = 'TESTS';
    component.form.value.email1 = 'test@prueba.com';
    component.form.value.email2 = '';
    component.form.value.idTipoProveedor = 'J';
    component.form.value.idTipoDocumento = 'RUC';
    component.form.value.direccion = 'Av. las flores 123';
    component.form.value.direccionFiscal = '';
    component.form.value.estado = 'A';
    component.form.value.estado = 'A';
    component.form.value.fechaCreacion = '2022-01-01';
    component.form.value.usuarioCreacion = 'test';

    component.modificar = false;

    _respuesta = {
      id: '1',
      message: 'ok',
      detail: '',
    };

    spyOn(_ProveedorService, 'agregarProveedor').and.returnValue(
      of(_respuesta)
    );

    component.agregarProveedor();

    expect(component).toBeTruthy();
  });

  it('Llama al método agregarProveedor, modificar = false y retorna error', () => {
    component.form.value.idProveedor = 'CON';
    component.form.value.nroDocumento = '1345678901';
    component.form.value.razonSocial = 'TEST SAC';
    component.form.value.nombreComercial = 'TESTS';
    component.form.value.email1 = 'test@prueba.com';
    component.form.value.email2 = '';
    component.form.value.idTipoProveedor = 'J';
    component.form.value.idTipoDocumento = 'RUC';
    component.form.value.direccion = 'Av. las flores 123';
    component.form.value.direccionFiscal = '';
    component.form.value.estado = 'A';
    component.form.value.estado = 'A';
    component.form.value.fechaCreacion = '2022-01-01';
    component.form.value.usuarioCreacion = 'test';

    component.modificar = false;

    _respuesta = {
      id: '0',
      message: 'error',
      detail: '',
    };

    spyOn(_ProveedorService, 'agregarProveedor').and.returnValue(
      of(_respuesta)
    );

    component.agregarProveedor();

    expect(component).toBeTruthy();
  });

  it('Llama al método eliminarProveedor, confirmacion = true y retorna ok', () => {
    component.confirmacion = true;

    _respuesta = {
      id: '1',
      message: 'ok',
      detail: '',
    };

    spyOn(_ProveedorService, 'eliminarProveedor').and.returnValue(
      of(_respuesta)
    );

    component.eliminarProveedor();

    expect(component).toBeTruthy();
  });

  it('Llama al método eliminarProveedor, confirmacion = false y retorna ok', () => {
    component.confirmacion = false;

    _respuesta = {
      id: '1',
      message: 'ok',
      detail: '',
    };

    spyOn(_ProveedorService, 'eliminarProveedor').and.returnValue(
      of(_respuesta)
    );

    component.eliminarProveedor();

    expect(component).toBeTruthy();
  });

  it('Llama al método eliminarProveedor, modificar = false y retorna error', () => {
    component.confirmacion = true;

    _respuesta = {
      id: '0',
      message: 'error',
      detail: '',
    };

    spyOn(_ProveedorService, 'eliminarProveedor').and.returnValue(
      of(_respuesta)
    );

    component.eliminarProveedor();

    expect(component).toBeTruthy();
  });

  it('Llama al método back', () => {
    component.back();

    expect(component).toBeTruthy();
  });
});
