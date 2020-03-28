import { Test } from '@nestjs/testing';

import { InstitutionService } from '../institution/institution.service';

describe('DatabaseService', () => {
  let service: InstitutionService;

  beforeAll(async () => {
    const app = await Test.createTestingModule({
      providers: [InstitutionService]
    }).compile();

    service = app.get<InstitutionService>(InstitutionService);
  });

  describe('getData', () => {
    it('should return load the service', () => {
      expect(service).toBeTruthy();
    });
  });
});
