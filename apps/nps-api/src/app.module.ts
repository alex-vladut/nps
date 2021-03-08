import { Module } from '@nestjs/common';

import { SurveysModule } from './surveys/surveys.module';

@Module({
  imports: [SurveysModule],
})
export class AppModule {}
