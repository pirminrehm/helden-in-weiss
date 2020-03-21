import { Test, TestingModule } from '@nestjs/testing';
import { VolunteerController } from './volunteer.controller';

describe('Helper Controller', () => {
  let controller: VolunteerController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [VolunteerController],
    }).compile();

    controller = module.get<VolunteerController>(VolunteerController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
