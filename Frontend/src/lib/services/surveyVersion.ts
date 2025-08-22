import api from '../api';

export interface SurveyVersion {
  id: string;
  name: string;
  description: string;
  version: string;
  is_active: boolean;
  survey_id: string;
  created_at: string;
  updated_at: string;
}

export const surveyVersionService = {
  // Get all active survey versions
  async getActiveSurveyVersions(): Promise<SurveyVersion[]> {
    const response = await api.get<{ success: boolean; data: SurveyVersion[] }>('/survey-versions');
    return response.data.data;
  },

  // Get survey version by ID
  async getSurveyVersionById(id: string): Promise<SurveyVersion> {
    const response = await api.get<{ success: boolean; data: SurveyVersion }>(`/survey-versions/${id}`);
    return response.data.data;
  },

  // Get survey versions by survey ID
  async getSurveyVersionsBySurveyId(surveyId: string): Promise<SurveyVersion[]> {
    const response = await api.get<{ success: boolean; data: SurveyVersion[] }>(`/surveys/${surveyId}/versions`);
    return response.data.data;
  },
};
