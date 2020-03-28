import { Test, TestingModule } from '@nestjs/testing';
import { EmailValidationController } from './email-validation.controller';

describe('EmailValidation Controller', () => {
  let controller: EmailValidationController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EmailValidationController],
    }).compile();

    controller = module.get<EmailValidationController>(EmailValidationController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
