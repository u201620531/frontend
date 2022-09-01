import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlantillaComprobanteComponent } from './plantilla-comprobante.component';

describe('PlantillaComprobanteComponent', () => {
  let component: PlantillaComprobanteComponent;
  let fixture: ComponentFixture<PlantillaComprobanteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlantillaComprobanteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlantillaComprobanteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
