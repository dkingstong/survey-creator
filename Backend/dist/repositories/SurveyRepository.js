"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SurveyRepository = void 0;
const database_1 = require("../config/database");
const Survey_1 = require("../entities/Survey");
class SurveyRepository {
    constructor() {
        this.repository = database_1.AppDataSource.getRepository(Survey_1.Survey);
    }
    async findById(id) {
        return this.repository.findOne({ where: { id } });
    }
    async findAll() {
        return this.repository.find({
            order: { created_at: 'DESC' }
        });
    }
    async create(surveyData) {
        const survey = this.repository.create(surveyData);
        return this.repository.save(survey);
    }
    async update(id, surveyData) {
        await this.repository.update(id, surveyData);
        return this.findById(id);
    }
    async delete(id) {
        const result = await this.repository.delete(id);
        return result.affected ? result.affected > 0 : false;
    }
    async findByName(name) {
        return this.repository.findOne({ where: { name } });
    }
    async nameExists(name, excludeId) {
        const query = this.repository.createQueryBuilder('survey')
            .where('survey.name = :name', { name });
        if (excludeId) {
            query.andWhere('survey.id != :id', { id: excludeId });
        }
        const count = await query.getCount();
        return count > 0;
    }
}
exports.SurveyRepository = SurveyRepository;
//# sourceMappingURL=SurveyRepository.js.map