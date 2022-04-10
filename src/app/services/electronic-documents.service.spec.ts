import { TestBed } from '@angular/core/testing';

import { ElectronicDocumentsService } from './electronic-documents.service';

describe('ElectronicDocumentsService', () => {
  let service: ElectronicDocumentsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ElectronicDocumentsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
