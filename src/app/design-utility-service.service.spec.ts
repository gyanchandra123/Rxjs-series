import { TestBed } from '@angular/core/testing';

import { DesignUtilityServiceService } from './design-utility-service.service';

describe('DesignUtilityServiceService', () => {
  let service: DesignUtilityServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DesignUtilityServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
