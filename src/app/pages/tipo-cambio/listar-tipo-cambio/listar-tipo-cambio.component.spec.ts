import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarTipoCambioComponent } from './listar-tipo-cambio.component';

describe('ListarTipoCambioComponent', () => {
  let component: ListarTipoCambioComponent;
  let fixture: ComponentFixture<ListarTipoCambioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListarTipoCambioComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListarTipoCambioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
