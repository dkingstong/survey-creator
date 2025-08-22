import api from '../api';

export interface Survey {
  id: string;
  name: string;
  description: string;
  created_at: string;
  updated_at: string;
}

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

export interface SurveyVersionHydrated {
  id: string;
  name: string;
  description: string;
  version: string;
  is_active: boolean;
  survey_id: string;
  created_at: string;
  updated_at: string;
  sessionStatus: string; // Status of the user's session (e.g., "completed", "in_progress", "not_started")
  question_number: number;
  surveySessionId: string;
}

export interface Question {
  id: string;
  title: string;
  description: string;
  type: 'text' | 'single_select' | 'multi_select' | 'rating' | 'date' | 'time' | 'location';
  metadata: Record<string, any>;
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

export interface SurveyVersionQuestion {
  id: string;
  order: number;
  survey_version_id: string;
  question_version_id: string;
  created_at: string;
  updated_at: string;
}

export interface SurveySession {
  id: string;
  name: string;
  user_id: string;
  survey_version_id: string;
  created_at: string;
  updated_at: string;
}

export interface Response {
  id: string;
  value: Record<string, any>;
  survey_session_id: string;
  question_version_id: string;
  created_at: string;
  updated_at: string;
}

export const surveyService = {
  // Get all surveys
  async getSurveys(): Promise<Survey[]> {
    const response = await api.get<{ success: boolean; data: Survey[] }>('/surveys');
    return response.data.data;
  },

  // Get survey by ID
  async getSurvey(id: string): Promise<Survey> {
    const response = await api.get<{ success: boolean; data: Survey }>(`/surveys/${id}`);
    return response.data.data;
  },

  // Get survey versions
  async getSurveyVersions(surveyId: string): Promise<SurveyVersion[]> {
    const response = await api.get<{ success: boolean; data: SurveyVersion[] }>(`/surveys/${surveyId}/versions`);
    return response.data.data;
  },

  // Get survey version with questions
  async getSurveyVersionWithQuestions(versionId: string): Promise<{
    surveyVersion: SurveyVersion;
    questions: (QuestionVersion & { options: Option[] })[];
  }> {
    const response = await api.get<{
      success: boolean;
      data: {
        surveyVersion: SurveyVersion;
        questions: (QuestionVersion & { options: Option[] })[];
      };
    }>(`/survey-versions/${versionId}/questions`);
    return response.data.data;
  },

  // Create survey session
  async createSurveySession(data: {
    name: string;
    survey_version_id: string;
  }): Promise<SurveySession> {
    const response = await api.post<{ success: boolean; data: SurveySession }>('/survey-sessions', data);
    return response.data.data;
  },

  // Submit response
  async submitResponse(data: {
    survey_session_id: string;
    question_version_id: string;
    value: Record<string, any>;
  }): Promise<Response> {
    const response = await api.post<{ success: boolean; data: Response }>('/responses', data);
    return response.data.data;
  },

  // Get survey session responses
  async getSessionResponses(sessionId: string): Promise<Response[]> {
    const response = await api.get<{ success: boolean; data: Response[] }>(`/survey-sessions/${sessionId}/responses`);
    return response.data.data;
  },

  // Get user's survey sessions
  async getUserSessions(): Promise<SurveySession[]> {
    const response = await api.get<{ success: boolean; data: SurveySession[] }>('/survey-sessions');
    return response.data.data;
  },
};
