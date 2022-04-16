import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WayPayAddComponent } from './way-pay-add.component';

describe('WayPayAddComponent', () => {
  let component: WayPayAddComponent;
  let fixture: ComponentFixture<WayPayAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WayPayAddComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WayPayAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
