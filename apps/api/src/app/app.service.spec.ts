import { Test } from '@nestjs/testing';

import { DatabaseService } from '../services/database.service';

describe('DatabaseService', () => {
  let service: DatabaseService;

  beforeAll(async () => {
    const app = await Test.createTestingModule({
      providers: [DatabaseService]
    }).compile();

    service = app.get<DatabaseService>(DatabaseService);
  });

  describe('getData', () => {
    it('should return "Welcome to api!"', () => {
      expect(service.getAllVolunteers()).toEqual([{
          name: 'Peter Pan',
          email: 'peter.pan@example.com',
          plz: 70569
      }]);
    });
  });
});
