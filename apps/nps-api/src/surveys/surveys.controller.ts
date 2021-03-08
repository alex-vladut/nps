import {
  Controller,
  Get,
  Param,
  NotFoundException,
  Post,
  Body,
} from '@nestjs/common';
import { SurveyResponseDto } from './survey-response.dto';

import { SurveysService } from './surveys.service';

@Controller('/surveys')
export class SurveysController {
  constructor(private readonly service: SurveysService) {}

  @Get(':id')
  getById(@Param('id') id: string) {
    const result = this.service.getById(id);
    if (!result) {
      throw new NotFoundException();
    }

    return result;
  }

  @Post(':id/responses')
  submit(@Param('id') id: string, @Body() response: SurveyResponseDto) {
    return this.service.saveResponse(id, response);
  }
}
