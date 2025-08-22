import { UserSession } from '../entities/UserSession';
export declare class UserSessionRepository {
    private repository;
    constructor();
    findById(id: string): Promise<UserSession | null>;
    findAll(): Promise<UserSession[]>;
    findByUserId(userId: string): Promise<UserSession[]>;
    findByRefreshToken(refreshToken: string): Promise<UserSession | null>;
    create(userSessionData: Partial<UserSession>): Promise<UserSession>;
    update(id: string, userSessionData: Partial<UserSession>): Promise<UserSession | null>;
    delete(id: string): Promise<boolean>;
    deleteByRefreshToken(refreshToken: string): Promise<boolean>;
    deleteByUserId(userId: string): Promise<boolean>;
    refreshTokenExists(refreshToken: string, excludeId?: string): Promise<boolean>;
    cleanupExpiredSessions(daysOld: number): Promise<number>;
}
//# sourceMappingURL=UserSessionRepository.d.ts.map