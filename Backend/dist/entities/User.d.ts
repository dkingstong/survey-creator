export declare class User {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    created_at: Date;
    updated_at: Date;
    hashPassword(): Promise<void>;
    comparePassword(candidatePassword: string): Promise<boolean>;
    toJSON(): Omit<this, "password" | "hashPassword" | "comparePassword" | "toJSON">;
}
//# sourceMappingURL=User.d.ts.map