import { Option } from '../entities/Options';
export declare class OptionRepository {
    private repository;
    constructor();
    findById(id: string): Promise<Option | null>;
    findAll(): Promise<Option[]>;
    findByQuestionVersionId(questionVersionId: string): Promise<Option[]>;
    create(optionData: Partial<Option>): Promise<Option>;
    update(id: string, optionData: Partial<Option>): Promise<Option | null>;
    delete(id: string): Promise<boolean>;
    findByValue(value: string, questionVersionId: string): Promise<Option | null>;
    valueExists(value: string, questionVersionId: string, excludeId?: string): Promise<boolean>;
    deleteByQuestionVersionId(questionVersionId: string): Promise<boolean>;
}
//# sourceMappingURL=OptionRepository.d.ts.map