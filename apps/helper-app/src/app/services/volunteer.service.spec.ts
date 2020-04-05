import { TestBed } from '@angular/core/testing';

import { VolunteerService } from './volunteer.service';

describe('VolunteerService', () => {
  let service: VolunteerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VolunteerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
