import { TestBed } from '@angular/core/testing';

import { CayegoryService } from './cayegory.service';

describe('CayegoryService', () => {
  let service: CayegoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CayegoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
