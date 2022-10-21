import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { EmpleadoService } from 'src/app/services/empleado.service';
import { UsuarioService } from 'src/app/services/usuario.service';

import { MainComponent } from './main.component';

describe('MainComponent', () => {
  let component: MainComponent;
  let fixture: ComponentFixture<MainComponent>;
  let _UsuarioService: UsuarioService;
  let _EmpleadoService: EmpleadoService;
  let _respuesta: any;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MainComponent],
      imports: [HttpClientTestingModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MainComponent);
    component = fixture.componentInstance;
    _UsuarioService = fixture.debugElement.injector.get(UsuarioService);
    _EmpleadoService = fixture.debugElement.injector.get(EmpleadoService);
    fixture.detectChanges();
  });

  it('Crear Componemte', () => {
    expect(component).toBeTruthy();
  });

  it('Llama al método ngOnInit', () => {
    spyOn(component, 'consultaEmpleado');
    component.ngOnInit();

    expect(component).toBeTruthy();
  });

  it('Llama al método ngOnInit', () => {
    _UsuarioService.currentUsuarioValue.idEmpleado;
    _respuesta = {
      nombre: 'test',
      apellido: 'test',
    };
    spyOn(_EmpleadoService, 'listarEmpleadoPoridEmpleado').and.returnValue(
      of(_respuesta)
    );
    component.consultaEmpleado();

    expect(component).toBeTruthy();
  });
});
