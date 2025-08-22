import { Question, QuestionType } from './Question';
export declare class QuestionVersion {
    id: string;
    question: Question;
    title: string;
    description: string;
    type: QuestionType;
    metadata: Record<string, any>;
    version: string;
    is_active: boolean;
    created_at: Date;
    updated_at: Date;
}
//# sourceMappingURL=QuestionVersion.d.ts.map