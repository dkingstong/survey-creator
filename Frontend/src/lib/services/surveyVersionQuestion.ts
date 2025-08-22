import api from '../api';

export interface SurveyVersionQuestion {
  id: string;
  order: number;
  survey_version_id: string;
  question_version_id: string;
  created_at: string;
  updated_at: string;
}

export interface QuestionVersion {
  id: string;
  title: string;
  description: string;
  type: 'text' | 'single_select' | 'multi_select' | 'rating' | 'date' | 'time' | 'location';
  metadata: Record<string, any>;
  version: string;
  is_active: boolean;
  question_id: string;
  created_at: string;
  updated_at: string;
}

export interface Option {
  id: string;
  value: string;
  label: string;
  question_version_id: string;
  created_at: string;
  updated_at: string;
}

export interface SurveyVersionQuestionWithDetails extends SurveyVersionQuestion {
  questionVersion: QuestionVersion & {
    options: Option[];
  };
}

export const surveyVersionQuestionService = {
  // Get all questions for a survey version
  async getQuestionsBySurveyVersion(surveyVersionId: string): Promise<SurveyVersionQuestion[]> {
    const response = await api.get<{ success: boolean; data: SurveyVersionQuestion[] }>(`/survey-version-questions/surveyVersion/${surveyVersionId}`);
    return response.data.data;
  },

  // Get questions with full details (including question version and options)
  async getQuestionsWithDetails(surveyVersionId: string): Promise<SurveyVersionQuestionWithDetails[]> {
    const response = await api.get<{ success: boolean; data: SurveyVersionQuestionWithDetails[] }>(`/survey-version-questions/surveyVersion/${surveyVersionId}`);
    return response.data.data;
  },
};
