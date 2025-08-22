import { SurveySession } from '../entities/SurveySession';
export declare class SurveySessionRepository {
    private repository;
    constructor();
    findById(id: string): Promise<SurveySession | null>;
    findAll(): Promise<SurveySession[]>;
    findByUserId(userId: string): Promise<SurveySession[]>;
    findBySurveyVersionId(surveyVersionId: string): Promise<SurveySession[]>;
    findBySurveyId(surveyId: string): Promise<SurveySession[]>;
    create(surveySessionData: Partial<SurveySession>): Promise<SurveySession>;
    update(id: string, surveySessionData: Partial<SurveySession>): Promise<SurveySession | null>;
    delete(id: string): Promise<boolean>;
    findByName(name: string, userId: string): Promise<SurveySession | null>;
    nameExists(name: string, userId: string, excludeId?: string): Promise<boolean>;
    deleteByUserId(userId: string): Promise<boolean>;
}
//# sourceMappingURL=SurveySessionRepository.d.ts.map