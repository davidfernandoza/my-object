import { Test, TestingModule } from '@nestjs/testing';
import { AuthServices } from './auth.services';

describe('AuthServices', () => {
  let provider: AuthServices;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AuthServices],
    }).compile();

    provider = module.get<AuthServices>(AuthServices);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
