"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SurveyVersionRepository = void 0;
const database_1 = require("../config/database");
const SurveyVersion_1 = require("../entities/SurveyVersion");
class SurveyVersionRepository {
    constructor() {
        this.repository = database_1.AppDataSource.getRepository(SurveyVersion_1.SurveyVersion);
    }
    async findById(id) {
        return this.repository.findOne({
            where: { id },
            relations: ['survey']
        });
    }
    async findAll() {
        return this.repository.find({
            relations: ['survey'],
            order: { created_at: 'DESC' }
        });
    }
    async findBySurveyId(surveyId) {
        return this.repository.find({
            where: { survey: { id: surveyId } },
            relations: ['survey'],
            order: { created_at: 'DESC' }
        });
    }
    async findActiveSurveys() {
        return this.repository.find({
            where: { is_active: true },
            relations: ['survey'],
            order: { created_at: 'DESC' }
        });
    }
    async create(surveyVersionData) {
        const surveyVersion = this.repository.create(surveyVersionData);
        return this.repository.save(surveyVersion);
    }
    async update(id, surveyVersionData) {
        await this.repository.update(id, surveyVersionData);
        return this.findById(id);
    }
    async delete(id) {
        const result = await this.repository.delete(id);
        return result.affected ? result.affected > 0 : false;
    }
    async findByVersion(version, surveyId) {
        return this.repository.findOne({
            where: { version, survey: { id: surveyId } },
            relations: ['survey']
        });
    }
    async versionExists(version, surveyId, excludeId) {
        const query = this.repository.createQueryBuilder('surveyVersion')
            .where('surveyVersion.version = :version', { version })
            .andWhere('surveyVersion.survey.id = :surveyId', { surveyId });
        if (excludeId) {
            query.andWhere('surveyVersion.id != :id', { id: excludeId });
        }
        const count = await query.getCount();
        return count > 0;
    }
}
exports.SurveyVersionRepository = SurveyVersionRepository;
//# sourceMappingURL=SurveyVersionRepository.js.map