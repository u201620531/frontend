import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReporteComprobanteComponent } from './reporte-comprobante.component';

describe('ReporteComprobanteComponent', () => {
  let component: ReporteComprobanteComponent;
  let fixture: ComponentFixture<ReporteComprobanteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReporteComprobanteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReporteComprobanteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});