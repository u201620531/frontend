import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregarComprobanteComponent } from './agregar-comprobante.component';

describe('AgregarComprobanteComponent', () => {
  let component: AgregarComprobanteComponent;
  let fixture: ComponentFixture<AgregarComprobanteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AgregarComprobanteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AgregarComprobanteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
