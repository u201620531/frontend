import { ComponentFixture, TestBed, tick } from '@angular/core/testing';

import { ListarTipoDocumentoComponent } from './listar-tipo-documento.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { TipoDocumentoService } from 'src/app/services/tipo-documento.service';
import { TipoDocumento } from 'src/app/interfaces/tipo-documento';
import { of } from 'rxjs';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

describe('ListarTipoDocumentoComponent', () => {
  let component: ListarTipoDocumentoComponent;
  let fixture: ComponentFixture<ListarTipoDocumentoComponent>;
  let _TipoDocumentoService: TipoDocumentoService;
  let listaTipoDocumento: TipoDocumento[];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListarTipoDocumentoComponent],
      imports: [
        MatPaginatorModule,
        MatSnackBarModule,
        MatSortModule,
        MatTableModule,
        HttpClientTestingModule,
        FormsModule,
        ReactiveFormsModule,
        BrowserAnimationsModule,
        MatProgressSpinnerModule,
        RouterModule.forRoot([]),
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListarTipoDocumentoComponent);
    component = fixture.componentInstance;
    _TipoDocumentoService =
      fixture.debugElement.injector.get(TipoDocumentoService);

    fixture.detectChanges();
  });

  it('Crear Componemte', () => {
    expect(component).toBeTruthy();
  });

  it('Llama al método ngOnInit', () => {
    spyOn(component, 'listarTipoDocumento');

    component.ngOnInit();
    
    expect(component.placeholderValue).toBe('Tipo de documento');
  });

  it('Llama al método listarTipoDocumento y retorna lista vacia', () => {
    spyOn(_TipoDocumentoService, 'listarTipoDocumento').and.returnValue(
      of(listaTipoDocumento)
    );

    expect(component).toBeTruthy();
  });

  it('Llama al método listarTipoDocumento y retorna lista', () => {
    listaTipoDocumento = [
      {
        idTipoDocumento: '01',
        descripcion: 'Factura',
        abreviatura: 'FAC',
        asientos:3,
        estado: 'A',
        fechaCreacion: '',
      },
    ];
    spyOn(_TipoDocumentoService, 'listarTipoDocumento').and.returnValue(
      of(listaTipoDocumento)
    );

    expect(component).toBeTruthy();
  });

  it('Llama al método eliminarTipoDocumento', () => {
    const response = [
      {
        id: '01',
        message: 'Factura',
        detail: 'FAC',
      },
    ];
    spyOn(_TipoDocumentoService, 'eliminarTipoDocumento').and.returnValue(
      of(response)
    );

    component.eliminarTipoDocumento('');

    expect(component).toBeTruthy();
  });

  it('Llama al método eliminarTipoDocumento y listarTipoDocumento', () => {
    const response = [
      {
        id: 1,
        message: 'Factura',
        detail: 'FAC',
      },
    ];
    spyOn(_TipoDocumentoService, 'eliminarTipoDocumento').and.returnValue(
      of(response)
    );
    spyOn(_TipoDocumentoService, 'listarTipoDocumento');

    component.eliminarTipoDocumento('');

    expect(component).toBeTruthy();
  });

  it('Llama al método modificarTipoDocumento', () => {
    component.modificarTipoDocumento('', 1);

    expect(component).toBeTruthy();
  });
});
