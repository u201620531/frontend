import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormatTypeAddComponent } from './format-type-add.component';

describe('FormatTypeAddComponent', () => {
  let component: FormatTypeAddComponent;
  let fixture: ComponentFixture<FormatTypeAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormatTypeAddComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormatTypeAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
