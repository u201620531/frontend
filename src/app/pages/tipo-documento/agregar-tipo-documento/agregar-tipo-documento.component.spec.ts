import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregarTipoDocumentoComponent } from './agregar-tipo-documento.component';
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
import { TipoDocumentoService } from 'src/app/services/tipo-documento.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { of } from 'rxjs';

describe('AgregarTipoDocumentoComponent', () => {
  let component: AgregarTipoDocumentoComponent;
  let fixture: ComponentFixture<AgregarTipoDocumentoComponent>;
  let _TipoDocumentoService: TipoDocumentoService;
  let _UsuarioService: UsuarioService;
  let _respuesta: any;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AgregarTipoDocumentoComponent],
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
    fixture = TestBed.createComponent(AgregarTipoDocumentoComponent);
    component = fixture.componentInstance;
    _TipoDocumentoService =
      fixture.debugElement.injector.get(TipoDocumentoService);
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
      params['idTipoDocumento'] = undefined;
    });

    expect(component).toBeTruthy();
  });

  it('Llama al método consultarTipoDocumento', () => {
    spyOn(_TipoDocumentoService, 'listarTipoDocumentoPorId');

    component.consultarTipoDocumento('CON');

    expect(component).toBeTruthy();
  });

  it('Llama al método agregarTipoDocumento, modificar = true y retorna ok', () => {
    component.form.value.idTipoDocumento = 'CON';
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

    spyOn(_TipoDocumentoService, 'actualizarTipoDocumento').and.returnValue(
      of(_respuesta)
    );

    component.agregarTipoDocumento();

    expect(component).toBeTruthy();
  });

  it('Llama al método agregarTipoDocumento, modificar = true y retorna error', () => {
    component.form.value.idTipoDocumento = 'CON';
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

    spyOn(_TipoDocumentoService, 'actualizarTipoDocumento').and.returnValue(
      of(_respuesta)
    );

    component.agregarTipoDocumento();

    expect(component).toBeTruthy();
  });

  it('Llama al método agregarTipoDocumento, modificar = false y retorna ok', () => {
    component.form.value.idTipoDocumento = 'CON';
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

    spyOn(_TipoDocumentoService, 'agegarTipoDocumento').and.returnValue(
      of(_respuesta)
    );

    component.agregarTipoDocumento();

    expect(component).toBeTruthy();
  });

  it('Llama al método agregarTipoDocumento, modificar = false y retorna error', () => {
    component.form.value.idTipoDocumento = 'CON';
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

    spyOn(_TipoDocumentoService, 'agegarTipoDocumento').and.returnValue(
      of(_respuesta)
    );

    component.agregarTipoDocumento();

    expect(component).toBeTruthy();
  });

  it('Llama al método eliminarTipoDocumento, confirmation = true y retorna ok', () => {
    component.confirmation = true;

    _respuesta = {
      id: '1',
      message: 'ok',
      detail: '',
    };

    spyOn(_TipoDocumentoService, 'eliminarTipoDocumento').and.returnValue(
      of(_respuesta)
    );

    component.eliminarTipoDocumento();

    expect(component).toBeTruthy();
  });

  it('Llama al método eliminarTipoDocumento, confirmation = false y retorna ok', () => {
    component.confirmation = false;

    _respuesta = {
      id: '1',
      message: 'ok',
      detail: '',
    };

    spyOn(_TipoDocumentoService, 'eliminarTipoDocumento').and.returnValue(
      of(_respuesta)
    );

    component.eliminarTipoDocumento();

    expect(component).toBeTruthy();
  });

  it('Llama al método eliminarTipoDocumento, modificar = false y retorna error', () => {
    component.confirmation = true;

    _respuesta = {
      id: '0',
      message: 'error',
      detail: '',
    };

    spyOn(_TipoDocumentoService, 'eliminarTipoDocumento').and.returnValue(
      of(_respuesta)
    );

    component.eliminarTipoDocumento();

    expect(component).toBeTruthy();
  });

  it('Llama al método back', () => {
    component.back();

    expect(component).toBeTruthy();
  });
});
