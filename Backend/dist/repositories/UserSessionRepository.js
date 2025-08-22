"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserSessionRepository = void 0;
const database_1 = require("../config/database");
const UserSession_1 = require("../entities/UserSession");
class UserSessionRepository {
    constructor() {
        this.repository = database_1.AppDataSource.getRepository(UserSession_1.UserSession);
    }
    async findById(id) {
        return this.repository.findOne({
            where: { id },
            relations: ['user']
        });
    }
    async findAll() {
        return this.repository.find({
            relations: ['user'],
            order: { created_at: 'DESC' }
        });
    }
    async findByUserId(userId) {
        return this.repository.find({
            where: { user: { id: userId } },
            relations: ['user'],
            order: { created_at: 'DESC' }
        });
    }
    async findByRefreshToken(refreshToken) {
        return this.repository.findOne({
            where: { refresh_token: refreshToken },
            relations: ['user']
        });
    }
    async create(userSessionData) {
        const userSession = this.repository.create(userSessionData);
        return this.repository.save(userSession);
    }
    async update(id, userSessionData) {
        await this.repository.update(id, userSessionData);
        return this.findById(id);
    }
    async delete(id) {
        const result = await this.repository.delete(id);
        return result.affected ? result.affected > 0 : false;
    }
    async deleteByRefreshToken(refreshToken) {
        const result = await this.repository.delete({ refresh_token: refreshToken });
        return result.affected ? result.affected > 0 : false;
    }
    async deleteByUserId(userId) {
        const result = await this.repository.delete({ user: { id: userId } });
        return result.affected ? result.affected > 0 : false;
    }
    async refreshTokenExists(refreshToken, excludeId) {
        const query = this.repository.createQueryBuilder('userSession')
            .where('userSession.refresh_token = :refreshToken', { refreshToken });
        if (excludeId) {
            query.andWhere('userSession.id != :id', { id: excludeId });
        }
        const count = await query.getCount();
        return count > 0;
    }
    async cleanupExpiredSessions(daysOld) {
        const cutoffDate = new Date();
        cutoffDate.setDate(cutoffDate.getDate() - daysOld);
        const result = await this.repository
            .createQueryBuilder()
            .delete()
            .where('created_at < :cutoffDate', { cutoffDate })
            .execute();
        return result.affected || 0;
    }
}
exports.UserSessionRepository = UserSessionRepository;
//# sourceMappingURL=UserSessionRepository.js.map