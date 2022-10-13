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

describe('AgregarProveedorComponent', () => {
  let component: AgregarProveedorComponent;
  let fixture: ComponentFixture<AgregarProveedorComponent>;
  let _ProveedorService: ProveedorService;
  let _SoporteService: SoporteService;
  let _UsuarioService: UsuarioService;

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

  it('should create', () => {
    component.idTipoProveedor = '';
    spyOn(component, 'listarTiposDocumento');
    spyOn(component, 'listarTiposProveedor');
    spyOn(component, 'initParams');

    expect(component).toBeTruthy();
  });
});
