import { User } from '../entities/User';
export declare class UserRepository {
    private repository;
    constructor();
    findByEmail(email: string): Promise<User | null>;
    findById(id: string): Promise<User | null>;
    findAll(): Promise<Partial<User>[]>;
    create(userData: Partial<User>): Promise<User>;
    update(id: string, userData: Partial<User>): Promise<User | null>;
    delete(id: string): Promise<boolean>;
    emailExists(email: string, excludeId?: string): Promise<boolean>;
}
//# sourceMappingURL=UserRepository.d.ts.map