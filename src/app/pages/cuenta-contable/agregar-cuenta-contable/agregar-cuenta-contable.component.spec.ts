import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregarCuentaContableComponent } from './agregar-cuenta-contable.component';

describe('AgregarCuentaContableComponent', () => {
  let component: AgregarCuentaContableComponent;
  let fixture: ComponentFixture<AgregarCuentaContableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AgregarCuentaContableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AgregarCuentaContableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
