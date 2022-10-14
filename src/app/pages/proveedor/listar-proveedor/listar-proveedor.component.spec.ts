import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarProveedorComponent } from './listar-proveedor.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ProveedorService } from 'src/app/services/proveedor.service';
import { Proveedor } from 'src/app/interfaces/proveedor';
import { of } from 'rxjs';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

describe('ListarProveedorComponent', () => {
  let component: ListarProveedorComponent;
  let fixture: ComponentFixture<ListarProveedorComponent>;
  let _ProveedorService: ProveedorService;
  let listaProveedor: Proveedor[];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListarProveedorComponent],
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
    fixture = TestBed.createComponent(ListarProveedorComponent);
    component = fixture.componentInstance;
    _ProveedorService = fixture.debugElement.injector.get(ProveedorService);

    fixture.detectChanges();
  });

  it('Crear Componemte', () => {
    expect(component).toBeTruthy();
  });

  it('Llama al método ngOnInit', () => {
    spyOn(component, 'ngOnInit');

    expect(component.placeholderValue).toBe('Proveedor');
  });

  it('Llama al método listarProveedor y retorna lista vacia', () => {
    spyOn(_ProveedorService, 'listarPoveedores').and.returnValue(
      of(listaProveedor)
    );

    expect(component).toBeTruthy();
  });

  it('Llama al método listarProveedor y retorna lista', () => {
    listaProveedor = [
      {
        idProveedor: '01',
        razonSocial: 'TEST',
        idTipoProveedor: 'J',
        idTipoDocumento: 'FT',
        email1: 'test@gmail.com',
        email2: '',
        nombreComercial: '',
        nroDocumento: '111111111',
        estado: 'A',
        fechaCreacion: '',
        usuarioCreacion: 'admin',
      },
    ];
    spyOn(_ProveedorService, 'listarPoveedores').and.returnValue(
      of(listaProveedor)
    );

    expect(component).toBeTruthy();
  });

  it('Llama al método eliminarProveedor', () => {
    const response = [
      {
        id: '01',
        message: 'Factura',
        detail: 'FAC',
      },
    ];
    spyOn(_ProveedorService, 'eliminarProveedor').and.returnValue(of(response));

    component.eliminarProveedor('');

    expect(component).toBeTruthy();
  });

  it('Llama al método eliminarProveedor y listarProveedor', () => {
    const response = [
      {
        id: 1,
        message: 'Factura',
        detail: 'FAC',
      },
    ];
    spyOn(_ProveedorService, 'eliminarProveedor').and.returnValue(of(response));
    spyOn(_ProveedorService, 'listarPoveedores');

    component.eliminarProveedor('');

    expect(component).toBeTruthy();
  });

  it('Llama al método modificarProveedor', () => {
    component.modificarProveedor('', 1);

    expect(component).toBeTruthy();
  });
});
