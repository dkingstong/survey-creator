import { SurveyVersionQuestion } from '../entities/SurveyVersionQuestion';
export declare class SurveyVersionQuestionRepository {
    private repository;
    constructor();
    findById(id: string): Promise<SurveyVersionQuestion | null>;
    findAll(): Promise<SurveyVersionQuestion[]>;
    findBySurveyVersionId(surveyVersionId: string): Promise<SurveyVersionQuestion[]>;
    findByQuestionVersionId(questionVersionId: string): Promise<SurveyVersionQuestion[]>;
    create(surveyVersionQuestionData: Partial<SurveyVersionQuestion>): Promise<SurveyVersionQuestion>;
    update(id: string, surveyVersionQuestionData: Partial<SurveyVersionQuestion>): Promise<SurveyVersionQuestion | null>;
    delete(id: string): Promise<boolean>;
    deleteBySurveyVersionId(surveyVersionId: string): Promise<boolean>;
    deleteByQuestionVersionId(questionVersionId: string): Promise<boolean>;
    reorderQuestions(surveyVersionId: string, questionOrders: {
        id: string;
        order: number;
    }[]): Promise<void>;
    getNextOrder(surveyVersionId: string): Promise<number>;
    questionExistsInSurveyVersion(surveyVersionId: string, questionVersionId: string, excludeId?: string): Promise<boolean>;
}
//# sourceMappingURL=SurveyVersionQuestionRepository.d.ts.map