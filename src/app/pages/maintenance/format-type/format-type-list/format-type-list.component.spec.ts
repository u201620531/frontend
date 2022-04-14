import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormatTypeListComponent } from './format-type-list.component';

describe('FormatTypeListComponent', () => {
  let component: FormatTypeListComponent;
  let fixture: ComponentFixture<FormatTypeListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormatTypeListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormatTypeListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
