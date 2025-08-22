import { SurveyVersion } from '../entities/SurveyVersion';
export declare class SurveyVersionRepository {
    private repository;
    constructor();
    findById(id: string): Promise<SurveyVersion | null>;
    findAll(): Promise<SurveyVersion[]>;
    findBySurveyId(surveyId: string): Promise<SurveyVersion[]>;
    findActiveSurveys(): Promise<SurveyVersion[]>;
    create(surveyVersionData: Partial<SurveyVersion>): Promise<SurveyVersion>;
    update(id: string, surveyVersionData: Partial<SurveyVersion>): Promise<SurveyVersion | null>;
    delete(id: string): Promise<boolean>;
    findByVersion(version: string, surveyId: string): Promise<SurveyVersion | null>;
    versionExists(version: string, surveyId: string, excludeId?: string): Promise<boolean>;
}
//# sourceMappingURL=SurveyVersionRepository.d.ts.map