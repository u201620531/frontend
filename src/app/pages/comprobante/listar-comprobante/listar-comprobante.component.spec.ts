import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarComprobanteComponent } from './listar-comprobante.component';

describe('ListarComprobanteComponent', () => {
  let component: ListarComprobanteComponent;
  let fixture: ComponentFixture<ListarComprobanteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListarComprobanteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListarComprobanteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
