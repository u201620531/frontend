import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregarTipoCambioComponent } from './agregar-tipo-cambio.component';

describe('AgregarTipoCambioComponent', () => {
  let component: AgregarTipoCambioComponent;
  let fixture: ComponentFixture<AgregarTipoCambioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AgregarTipoCambioComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AgregarTipoCambioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
