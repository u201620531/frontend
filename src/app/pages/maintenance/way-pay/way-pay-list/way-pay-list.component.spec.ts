import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WayPayListComponent } from './way-pay-list.component';

describe('WayPayListComponent', () => {
  let component: WayPayListComponent;
  let fixture: ComponentFixture<WayPayListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WayPayListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WayPayListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
