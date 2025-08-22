import { Response } from '../entities/Response';
export declare class ResponseRepository {
    private repository;
    constructor();
    findById(id: string): Promise<Response | null>;
    findAll(): Promise<Response[]>;
    findBySurveySessionId(surveySessionId: string): Promise<Response[]>;
    findByQuestionVersionId(questionVersionId: string): Promise<Response[]>;
    findByUserId(userId: string): Promise<Response[]>;
    findBySurveyId(surveyId: string): Promise<Response[]>;
    create(responseData: Partial<Response>): Promise<Response>;
    update(id: string, responseData: Partial<Response>): Promise<Response | null>;
    delete(id: string): Promise<boolean>;
    findBySurveySessionAndQuestion(surveySessionId: string, questionVersionId: string): Promise<Response | null>;
    deleteBySurveySessionId(surveySessionId: string): Promise<boolean>;
    deleteByQuestionVersionId(questionVersionId: string): Promise<boolean>;
}
//# sourceMappingURL=ResponseRepository.d.ts.map