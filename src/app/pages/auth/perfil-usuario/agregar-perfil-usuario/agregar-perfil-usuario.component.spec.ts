import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregarPerfilUsuarioComponent } from './agregar-perfil-usuario.component';

describe('AgregarPerfilUsuarioComponent', () => {
  let component: AgregarPerfilUsuarioComponent;
  let fixture: ComponentFixture<AgregarPerfilUsuarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AgregarPerfilUsuarioComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AgregarPerfilUsuarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
