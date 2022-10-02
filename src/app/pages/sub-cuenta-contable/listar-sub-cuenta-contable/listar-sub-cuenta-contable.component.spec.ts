import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarSubCuentaContableComponent } from './listar-sub-cuenta-contable.component';

describe('ListarSubCuentaContableComponent', () => {
  let component: ListarSubCuentaContableComponent;
  let fixture: ComponentFixture<ListarSubCuentaContableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListarSubCuentaContableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListarSubCuentaContableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
