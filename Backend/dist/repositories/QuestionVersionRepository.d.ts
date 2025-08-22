import { QuestionVersion } from '../entities/QuestionVersion';
import { QuestionType } from '../entities/Question';
export declare class QuestionVersionRepository {
    private repository;
    constructor();
    findById(id: string): Promise<QuestionVersion | null>;
    findAll(): Promise<QuestionVersion[]>;
    findByQuestionId(questionId: string): Promise<QuestionVersion[]>;
    findByType(type: QuestionType): Promise<QuestionVersion[]>;
    findActiveQuestionVersions(): Promise<QuestionVersion[]>;
    create(questionVersionData: Partial<QuestionVersion>): Promise<QuestionVersion>;
    update(id: string, questionVersionData: Partial<QuestionVersion>): Promise<QuestionVersion | null>;
    delete(id: string): Promise<boolean>;
    findByVersion(version: string, questionId: string): Promise<QuestionVersion | null>;
    versionExists(version: string, questionId: string, excludeId?: string): Promise<boolean>;
}
//# sourceMappingURL=QuestionVersionRepository.d.ts.map