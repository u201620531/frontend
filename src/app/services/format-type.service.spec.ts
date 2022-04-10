import { TestBed } from '@angular/core/testing';

import { FormatTypeService } from './format-type.service';

describe('FormatTypeService', () => {
  let service: FormatTypeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FormatTypeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
