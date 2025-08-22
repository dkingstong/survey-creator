import { Question, QuestionType } from '../entities/Question';
export declare class QuestionRepository {
    private repository;
    constructor();
    findById(id: string): Promise<Question | null>;
    findAll(): Promise<Question[]>;
    findByType(type: QuestionType): Promise<Question[]>;
    create(questionData: Partial<Question>): Promise<Question>;
    update(id: string, questionData: Partial<Question>): Promise<Question | null>;
    delete(id: string): Promise<boolean>;
    findByTitle(title: string): Promise<Question | null>;
    titleExists(title: string, excludeId?: string): Promise<boolean>;
}
//# sourceMappingURL=QuestionRepository.d.ts.map