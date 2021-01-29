import { Test, TestingModule } from '@nestjs/testing';
import { MarkersController } from './markers.controller';

describe('MarkersController', () => {
  let controller: MarkersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MarkersController],
    }).compile();

    controller = module.get<MarkersController>(MarkersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
