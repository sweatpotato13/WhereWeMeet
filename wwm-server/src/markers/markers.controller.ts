import { Controller, Get } from '@nestjs/common';

@Controller('markers')
export class MarkersController {

  // TODO :: Provider 학습 필요
  @Get()
  findAll(): object {
    return {
      'id': 1,
      'latitude': 37.5665,
      'longitude': 126.87905
    }
  }
}
