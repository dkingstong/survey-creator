import { Survey } from '../entities/Survey';
export declare class SurveyRepository {
    private repository;
    constructor();
    findById(id: string): Promise<Survey | null>;
    findAll(): Promise<Survey[]>;
    create(surveyData: Partial<Survey>): Promise<Survey>;
    update(id: string, surveyData: Partial<Survey>): Promise<Survey | null>;
    delete(id: string): Promise<boolean>;
    findByName(name: string): Promise<Survey | null>;
    nameExists(name: string, excludeId?: string): Promise<boolean>;
}
//# sourceMappingURL=SurveyRepository.d.ts.map