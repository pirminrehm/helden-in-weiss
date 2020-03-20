import { Test, TestingModule } from '@nestjs/testing';

import { AppController } from './app.controller';
import { DatabaseService } from './database.service';

describe('AppController', () => {
  let app: TestingModule;

  beforeAll(async () => {
    app = await Test.createTestingModule({
      controllers: [AppController],
      providers: [DatabaseService]
    }).compile();
  });

  describe('getData', () => {
    it('should return "Welcome to api!"', () => {
      const appController = app.get<AppController>(AppController);
      expect(appController.getAllHelper()).toEqual([{
          name: 'Peter Pan',
          email: 'peter.pan@example.com',
          plz: 70569
      }]);
    });
  });
});
