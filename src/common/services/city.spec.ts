import { Test, TestingModule } from '@nestjs/testing';
import { City } from './city';

describe('City', () => {
  let provider: City;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [City],
    }).compile();

    provider = module.get<City>(City);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
