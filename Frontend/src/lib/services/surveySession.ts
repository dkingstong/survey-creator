import api from '../api';
import { SurveyVersion } from './surveyVersion';

export interface SurveySession {
  id: string;
  name: string;
  user_id: string;
  surveyVersion: SurveyVersion;
  status: string;
  question_number: number;
  created_at: string;
  updated_at: string;
}

export interface CreateSurveySessionData {
  surveyVersionId: string;
}

export interface UpdateSurveySessionData {
  id: string;
  question_number: number;
}

export const surveySessionService = {
  // Get survey sessions by user ID
  async getSessionsByUserId(userId: string): Promise<SurveySession[]> {
    const response = await api.get<{ success: boolean; data: SurveySession[] }>(`/survey-sessions/user/${userId}`);
    return response.data.data;
  },

  // Create a new survey session
  async createSession(data: CreateSurveySessionData): Promise<SurveySession> {
    const response = await api.post<{ success: boolean; data: SurveySession }>('/survey-sessions', data);
    return response.data.data;
  },

  // Get current user's survey sessions
  async getCurrentUserSessions(): Promise<SurveySession[]> {
    // This assumes the backend can determine the current user from the JWT token
    // You might need to adjust this based on your backend implementation
    const response = await api.get<{ success: boolean; data: SurveySession[] }>('/survey-sessions');
    return response.data.data;
  },

  // Update a survey session
  async updateSession(data: UpdateSurveySessionData): Promise<SurveySession> {
    const response = await api.put<{ success: boolean; data: SurveySession }>(`/survey-sessions/${data.id}`, data);
    return response.data.data;
  },
};
