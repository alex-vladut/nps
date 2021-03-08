import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { writeFileSync, existsSync, mkdir, mkdirSync } from 'fs';
import { join } from 'path';
import { SurveyResponseDto } from './survey-response.dto';

import { surveys } from './surveys';

@Injectable()
export class SurveysService {
  getById(id: string): any {
    return surveys.find((survey) => survey.survey_id === id);
  }

  saveResponse(surveyId: string, response: SurveyResponseDto) {
    if (!existsSync(join(__dirname, '../../../nps-responses'))) {
      mkdirSync(join(__dirname, '../../../nps-responses'));
    }

    const id = uuidv4();
    writeFileSync(
      join(__dirname, '../../../nps-responses', `${id}.json`),
      JSON.stringify(
        {
          id,
          surveyId: surveyId,
          data: response,
        },
        null,
        2
      )
    );
    return response;
  }
}
