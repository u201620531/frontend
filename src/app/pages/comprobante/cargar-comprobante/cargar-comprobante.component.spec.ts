import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CargarComprobanteComponent } from './cargar-comprobante.component';

describe('CargarComprobanteComponent', () => {
  let component: CargarComprobanteComponent;
  let fixture: ComponentFixture<CargarComprobanteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CargarComprobanteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CargarComprobanteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
