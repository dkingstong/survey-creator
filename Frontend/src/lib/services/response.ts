import api from '../api';
import { QuestionVersion } from './surveyVersionQuestion';
import { SurveySession } from './surveySession';

export interface Response {
  id: string;
  value: Record<string, any>;
  surveySession: SurveySession;
  questionVersion: QuestionVersion;
  created_at: string;
  updated_at: string;
}

export interface CreateResponseData {
  surveySessionId: string;
  questionVersionId: string;
  is_last_question?: boolean;
  value: Record<string, any>;
}

export const responseService = {
  // Get all responses for a survey session
  async getResponsesBySurveySession(surveySessionId: string): Promise<Response[]> {
    const response = await api.get<{ success: boolean; data: Response[] }>(`/responses/surveySession/${surveySessionId}`);
    return response.data.data;
  },

  // Submit a new response
  async submitResponseAndUpdateSession(data: CreateResponseData): Promise<Response> {
    const response = await api.post<{ success: boolean; data: Response }>('/responses', data);
    return response.data.data;
  },

  // Get response by ID
  async getResponseById(responseId: string): Promise<Response> {
    const response = await api.get<{ success: boolean; data: Response }>(`/responses/${responseId}`);
    return response.data.data;
  },

  // Update a response
  async updateResponse(responseId: string, data: Partial<CreateResponseData>): Promise<Response> {
    const response = await api.put<{ success: boolean; data: Response }>(`/responses/${responseId}`, data);
    return response.data.data;
  },

  // Delete a response
  async deleteResponse(responseId: string): Promise<void> {
    await api.delete(`/responses/${responseId}`);
  },
};
