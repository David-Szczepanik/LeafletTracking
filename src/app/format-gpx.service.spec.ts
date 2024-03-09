import { TestBed } from '@angular/core/testing';

import { FormatGpxService } from './format-gpx.service';

describe('FormatGpxService', () => {
  let service: FormatGpxService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FormatGpxService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
