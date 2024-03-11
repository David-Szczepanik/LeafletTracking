import { TestBed } from '@angular/core/testing';

import { ChangeTabsService } from './change-tabs.service';

describe('ChangeTabsService', () => {
  let service: ChangeTabsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ChangeTabsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
