import survey from './survey.json';

export function useFetchSurvey(surveyId) {
  return survey.survey_id === surveyId
    ? { data: survey, loading: false, error: null }
    : { data: null, loading: false, error: 'Survey not found' };
}
