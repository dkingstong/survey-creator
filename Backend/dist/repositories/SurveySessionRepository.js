"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SurveySessionRepository = void 0;
const database_1 = require("../config/database");
const SurveySession_1 = require("../entities/SurveySession");
class SurveySessionRepository {
    constructor() {
        this.repository = database_1.AppDataSource.getRepository(SurveySession_1.SurveySession);
    }
    async findById(id) {
        return this.repository.findOne({
            where: { id },
            relations: ['user', 'surveyVersion']
        });
    }
    async findAll() {
        return this.repository.find({
            relations: ['user', 'surveyVersion'],
            order: { created_at: 'DESC' }
        });
    }
    async findByUserId(userId) {
        return this.repository.find({
            where: { user: { id: userId } },
            relations: ['user', 'surveyVersion'],
            order: { created_at: 'DESC' }
        });
    }
    async findBySurveyVersionId(surveyVersionId) {
        return this.repository.find({
            where: { surveyVersion: { id: surveyVersionId } },
            relations: ['user', 'surveyVersion'],
            order: { created_at: 'DESC' }
        });
    }
    async findBySurveyId(surveyId) {
        return this.repository.find({
            where: { surveyVersion: { survey: { id: surveyId } } },
            relations: ['user', 'surveyVersion', 'surveyVersion.survey'],
            order: { created_at: 'DESC' }
        });
    }
    async create(surveySessionData) {
        const surveySession = this.repository.create(surveySessionData);
        return this.repository.save(surveySession);
    }
    async update(id, surveySessionData) {
        await this.repository.update(id, surveySessionData);
        return this.findById(id);
    }
    async delete(id) {
        const result = await this.repository.delete(id);
        return result.affected ? result.affected > 0 : false;
    }
    async findByName(name, userId) {
        return this.repository.findOne({
            where: { name, user: { id: userId } },
            relations: ['user', 'surveyVersion']
        });
    }
    async nameExists(name, userId, excludeId) {
        const query = this.repository.createQueryBuilder('surveySession')
            .where('surveySession.name = :name', { name })
            .andWhere('surveySession.user.id = :userId', { userId });
        if (excludeId) {
            query.andWhere('surveySession.id != :id', { id: excludeId });
        }
        const count = await query.getCount();
        return count > 0;
    }
    async deleteByUserId(userId) {
        const result = await this.repository.delete({ user: { id: userId } });
        return result.affected ? result.affected > 0 : false;
    }
}
exports.SurveySessionRepository = SurveySessionRepository;
//# sourceMappingURL=SurveySessionRepository.js.map