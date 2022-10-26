import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import {
  MatDialogModule,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { EmpleadoService } from 'src/app/services/empleado.service';

import { SearchModalComponent } from './search-modal.component';

describe('SearchModalComponent', () => {
  let component: SearchModalComponent;
  let fixture: ComponentFixture<SearchModalComponent>;
  let _EmpleadoService: EmpleadoService;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SearchModalComponent],
      imports: [HttpClientModule, MatDialogModule],
      providers: [
        { provide: MatDialogRef, useValue: {} },
        { provide: MAT_DIALOG_DATA, useValue: [] },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchModalComponent);
    component = fixture.componentInstance;
    _EmpleadoService = fixture.debugElement.injector.get(EmpleadoService);
    fixture.detectChanges();
  });

  it('Crear Componemte', () => {
    expect(component).toBeTruthy();
  });

  it('Llama al método ngOnInit', () => {
    spyOn(component, 'loadDocumentTypes');
    component.ngOnInit();

    expect(component).toBeTruthy();
  });

  it('Llama al método loadDocumentTypes', () => {
    component.listaEmpleados = [
      {
        idEmpleado: '',
        nombre: '',
        apellido: '',
        idCargo: '',
        email1: '',
        email2: '',
        estado: '',
        usuarioCreacion: '',
        fechaCreacion: '',
        fechaNacimiento: '',
      },
    ];
    component.loadDocumentTypes();

    expect(component).toBeTruthy();
  });
});
