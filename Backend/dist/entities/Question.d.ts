export declare enum QuestionType {
    TEXT = "text",
    SINGLE_SELECT = "single_select",
    MULTI_SELECT = "multi_select",
    RATING = "rating",
    DATE = "date",
    TIME = "time",
    LOCATION = "location"
}
export declare class Question {
    id: string;
    title: string;
    description: string;
    type: QuestionType;
    metadata: Record<string, any>;
    created_at: Date;
    updated_at: Date;
}
//# sourceMappingURL=Question.d.ts.map