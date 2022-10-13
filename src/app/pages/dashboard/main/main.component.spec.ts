import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EmpleadoService } from 'src/app/services/empleado.service';
import { UsuarioService } from 'src/app/services/usuario.service';

import { MainComponent } from './main.component';

describe('MainComponent', () => {
  let component: MainComponent;
  let fixture: ComponentFixture<MainComponent>;
  let _UsuarioService: UsuarioService;
  let _EmpleadoService: EmpleadoService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MainComponent],
      imports: [
        HttpClientTestingModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MainComponent);
    component = fixture.componentInstance;
    _UsuarioService = fixture.debugElement.injector.get(UsuarioService);
    _EmpleadoService = fixture.debugElement.injector.get(EmpleadoService);
    fixture.detectChanges();
  });

  it('should create', () => {
    spyOn(component,'consultaEmpleado');
    expect(component).toBeTruthy();
  });
});
