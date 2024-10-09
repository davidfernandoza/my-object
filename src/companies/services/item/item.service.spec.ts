import { Test, TestingModule } from '@nestjs/testing';
import { ItemService } from './item.service';

describe('ItemService', () => {
  let provider: ItemService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ItemService],
    }).compile();

    provider = module.get<ItemService>(ItemService);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
