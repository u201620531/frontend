import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarPlantillaComponent } from './listar-plantilla.component';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { PlantillaComprobanteService } from 'src/app/services/plantilla-comprobante.service';
import { PlantillaComprobante } from 'src/app/interfaces/plantilla-comprobante';
import { of } from 'rxjs';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('ListarPlantillaComponent', () => {
  let component: ListarPlantillaComponent;
  let fixture: ComponentFixture<ListarPlantillaComponent>;
  let _PlantillaComprobanteService: PlantillaComprobanteService;
  let _respuesta: any;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListarPlantillaComponent],
      imports: [
        MatPaginatorModule,
        MatSnackBarModule,
        MatSortModule,
        MatTableModule,
        HttpClientTestingModule,
        FormsModule,
        ReactiveFormsModule,
        BrowserAnimationsModule,
        RouterModule.forRoot([]),
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListarPlantillaComponent);
    component = fixture.componentInstance;
    _PlantillaComprobanteService = fixture.debugElement.injector.get(
      PlantillaComprobanteService
    );
    fixture.detectChanges();
  });

  it('Crear Componemte', () => {
    expect(component).toBeTruthy();
  });

  // it('Llama al método setDataSourceAttributes', () => {
  //   component.paginator=undefined;
  //   component.sort=null;

  //   component.setDataSourceAttributes();

  //   expect(component).toBeTruthy();
  // });

  it('Llama al método ngOnInit', () => {
    spyOn(component, 'listarPlantillas');

    component.ngOnInit();

    expect(component).toBeTruthy();
  });

  it('Llama al método listarPlantillas', () => {
    _respuesta = {
      idPlantillaComprobante: '000001',
      nroTicketEnvio: '0001',
      fechaCarga: '2022-01-01',
      fechaDeclaracion: '2022-01-01',
      observacion: 'test',
      estado: 'A',
      fechaCreacion: '2022-01-01',
    };
    spyOn(
      _PlantillaComprobanteService,
      'listarPlantillaComprobante'
    ).and.returnValue(of(_respuesta));

    component.listarPlantillas();

    expect(component).toBeTruthy();
  });

  it('Llama al método eliminarPlantillaComprobante', () => {
    const response = [
      {
        id: '01',
        message: 'Factura',
        detail: 'FAC',
      },
    ];
    spyOn(
      _PlantillaComprobanteService,
      'eliminarPlantillaComprobante'
    ).and.returnValue(of(response));

    component.eliminarPlantillaComprobante('');

    expect(component).toBeTruthy();
  });

  it('Llama al método eliminarPlantillaComprobante y listarPlantillas', () => {
    const response = [
      {
        id: 1,
        message: 'Factura',
        detail: 'FAC',
      },
    ];
    spyOn(
      _PlantillaComprobanteService,
      'eliminarPlantillaComprobante'
    ).and.returnValue(of(response));
    spyOn(component, 'listarPlantillas');

    component.eliminarPlantillaComprobante('');

    expect(component).toBeTruthy();
  });

  it('Llama al método modificarPlantillaComprobante', () => {
    component.modificarPlantillaComprobante('', 1);

    expect(component).toBeTruthy();
  });
});
