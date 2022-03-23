import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScanElectronicDocumentsComponent } from './scan-electronic-documents.component';

describe('ScanElectronicDocumentsComponent', () => {
  let component: ScanElectronicDocumentsComponent;
  let fixture: ComponentFixture<ScanElectronicDocumentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ScanElectronicDocumentsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ScanElectronicDocumentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
