import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregarSubCuentaContableComponent } from './agregar-sub-cuenta-contable.component';

describe('AgregarSubCuentaContableComponent', () => {
  let component: AgregarSubCuentaContableComponent;
  let fixture: ComponentFixture<AgregarSubCuentaContableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AgregarSubCuentaContableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AgregarSubCuentaContableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
