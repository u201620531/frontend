import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarCuentaContableComponent } from './listar-cuenta-contable.component';

describe('ListarCuentaContableComponent', () => {
  let component: ListarCuentaContableComponent;
  let fixture: ComponentFixture<ListarCuentaContableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListarCuentaContableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListarCuentaContableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
