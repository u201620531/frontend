import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarUsuarioComponent } from './listar-usuario.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { of } from 'rxjs';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { UsuarioService } from 'src/app/services/usuario.service';
import { Usuario } from 'src/app/interfaces/usuario';

describe('ListarUsuarioComponent', () => {
  let component: ListarUsuarioComponent;
  let fixture: ComponentFixture<ListarUsuarioComponent>;
  let _UsuarioService: UsuarioService;
  let listaUsuario: Usuario[];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListarUsuarioComponent],
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
    fixture = TestBed.createComponent(ListarUsuarioComponent);
    component = fixture.componentInstance;
    _UsuarioService = fixture.debugElement.injector.get(UsuarioService);
    fixture.detectChanges();
  });

  it('Crear Componemte', () => {
    expect(component).toBeTruthy();
  });

  it('Llama al método ngOnInit', () => {
    spyOn(component, 'listarUsuarios');

    component.ngOnInit();

    expect(component.placeholderValue).toBe('Usuario');
  });

  it('Llama al método listarUsuario y retorna lista vacia', () => {
    spyOn(_UsuarioService, 'listarUsuarios').and.returnValue(of(listaUsuario));

    expect(component).toBeTruthy();
  });

  it('Llama al método listarUsuario y retorna lista', () => {
    listaUsuario = [
      {
        idEmpleado: '',
        codigoUsuario: '',
        contrasena: '',
        idPerfilUsuario: '',
        estado: 'A',
        fechaCreacion: '',
        usuarioCreacion: 'admin',
      },
    ];
    spyOn(_UsuarioService, 'listarUsuarios').and.returnValue(of(listaUsuario));

    expect(component).toBeTruthy();
  });

  it('Llama al método eliminarUsuario', () => {
    const response = [
      {
        id: '01',
        message: 'Factura',
        detail: 'FAC',
      },
    ];
    spyOn(_UsuarioService, 'eliminarUsuario').and.returnValue(of(response));

    component.eliminarUsuario('', '');

    expect(component).toBeTruthy();
  });

  it('Llama al método eliminarUsuario y listarUsuario', () => {
    const response = [
      {
        id: 1,
        message: 'Factura',
        detail: 'FAC',
      },
    ];
    spyOn(_UsuarioService, 'eliminarUsuario').and.returnValue(of(response));
    spyOn(_UsuarioService, 'listarUsuarios');

    component.eliminarUsuario('', '');

    expect(component).toBeTruthy();
  });

  it('Llama al método modificarUsuario', () => {
    component.modificarUsuario('', '', 1);

    expect(component).toBeTruthy();
  });
});
