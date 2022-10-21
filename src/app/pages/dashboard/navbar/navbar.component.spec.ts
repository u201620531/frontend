import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { ModuloService } from 'src/app/services/modulo.service';
import { UsuarioService } from 'src/app/services/usuario.service';

import { NavbarComponent } from './navbar.component';

describe('NavbarComponent', () => {
  let component: NavbarComponent;
  let fixture: ComponentFixture<NavbarComponent>;
  let _UsuarioService: UsuarioService;
  let _ModuloService: ModuloService;
  let _respuesta: any;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NavbarComponent],
      imports: [
        HttpClientModule,
        RouterModule,
        MatSnackBarModule,
        RouterTestingModule,
        MatMenuModule,
        BrowserAnimationsModule,
        MatProgressSpinnerModule,
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NavbarComponent);
    component = fixture.componentInstance;
    _UsuarioService = fixture.debugElement.injector.get(UsuarioService);
    _ModuloService = fixture.debugElement.injector.get(ModuloService);
    fixture.detectChanges();
  });

  it('Crear Componemte', () => {
    expect(component).toBeTruthy();
  });

  it('Llama al método ngOnInit', () => {
    component.ngOnInit();

    expect(component).toBeTruthy();
  });

  it('Llama al método loadModulo', () => {
    _UsuarioService.currentUsuarioValue.idPerfilUsuario = '';
    _respuesta = [
      {
        idModulo: '01',
        nombreModulo: 'home',
        vistaModulo: '/',
        esPrincipal: 1,
        idMenu: '',
        nombreMenu: 'M1',
        vistaMenu: '/',
        esPadre: 1,
        idSubMenu: '',
        nombreSubMenu: 'SM001',
        vistaSubMenu: 'SM01',
        banner: 0,
      },
      {
        idModulo: '02',
        nombreModulo: 'TEST',
        vistaModulo: '/',
        esPrincipal: 1,
        idMenu: 'M01',
        nombreMenu: 'M1',
        vistaMenu: '/',
        esPadre: 1,
        idSubMenu: 'SM1',
        nombreSubMenu: 'SM001',
        vistaSubMenu: 'SM01',
        banner: 0,
      },
    ];
    spyOn(_ModuloService, 'listarModulosPorIdPerfilUsuario').and.returnValue(
      of(_respuesta)
    );

    component.loadModulo();

    expect(component).toBeTruthy();
  });

  it('Llama al método logout', () => {
    spyOn(_UsuarioService, 'logout');

    component.logout();

    expect(component).toBeTruthy();
  });
});
