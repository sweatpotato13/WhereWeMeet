import { Body, Controller, Get, HttpCode, Post } from '@nestjs/common';
import { combineLatest } from 'rxjs';

@Controller('markers')
export class MarkersController {

  // TODO :: Provider 학습 필요(여러 가지 마커 정보를 받기 위해)
  @Get()
  findAll(): object {
    return {
      'id': 1,
      'latitude': 37.5665,
      'longitude': 126.87905
    }
  }

  // TODO :: post 메소드 구현 필요!! 클라이언트에서 마커들의 정보를 받는
  @Post()
  @HttpCode(201)
  createMarker(@Body('id') id, @Body('latitude') lat, @Body('longitude') long) {
    return { id, lat, long };
  }
}
