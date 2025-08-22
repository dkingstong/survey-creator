"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SurveyVersionQuestionRepository = void 0;
const database_1 = require("../config/database");
const SurveyVersionQuestion_1 = require("../entities/SurveyVersionQuestion");
class SurveyVersionQuestionRepository {
    constructor() {
        this.repository = database_1.AppDataSource.getRepository(SurveyVersionQuestion_1.SurveyVersionQuestion);
    }
    async findById(id) {
        return this.repository.findOne({
            where: { id },
            relations: ['surveyVersion', 'questionVersion']
        });
    }
    async findAll() {
        return this.repository.find({
            relations: ['surveyVersion', 'questionVersion'],
            order: { order: 'ASC' }
        });
    }
    async findBySurveyVersionId(surveyVersionId) {
        return this.repository.find({
            where: { surveyVersion: { id: surveyVersionId } },
            relations: ['surveyVersion', 'questionVersion'],
            order: { order: 'ASC' }
        });
    }
    async findByQuestionVersionId(questionVersionId) {
        return this.repository.find({
            where: { questionVersion: { id: questionVersionId } },
            relations: ['surveyVersion', 'questionVersion'],
            order: { order: 'ASC' }
        });
    }
    async create(surveyVersionQuestionData) {
        const surveyVersionQuestion = this.repository.create(surveyVersionQuestionData);
        return this.repository.save(surveyVersionQuestion);
    }
    async update(id, surveyVersionQuestionData) {
        await this.repository.update(id, surveyVersionQuestionData);
        return this.findById(id);
    }
    async delete(id) {
        const result = await this.repository.delete(id);
        return result.affected ? result.affected > 0 : false;
    }
    async deleteBySurveyVersionId(surveyVersionId) {
        const result = await this.repository.delete({ surveyVersion: { id: surveyVersionId } });
        return result.affected ? result.affected > 0 : false;
    }
    async deleteByQuestionVersionId(questionVersionId) {
        const result = await this.repository.delete({ questionVersion: { id: questionVersionId } });
        return result.affected ? result.affected > 0 : false;
    }
    async reorderQuestions(surveyVersionId, questionOrders) {
        for (const { id, order } of questionOrders) {
            await this.repository.update(id, { order });
        }
    }
    async getNextOrder(surveyVersionId) {
        const result = await this.repository
            .createQueryBuilder('svq')
            .select('MAX(svq.order)', 'maxOrder')
            .where('svq.surveyVersion.id = :surveyVersionId', { surveyVersionId })
            .getRawOne();
        return (result?.maxOrder || 0) + 1;
    }
    async questionExistsInSurveyVersion(surveyVersionId, questionVersionId, excludeId) {
        const query = this.repository.createQueryBuilder('svq')
            .where('svq.surveyVersion.id = :surveyVersionId', { surveyVersionId })
            .andWhere('svq.questionVersion.id = :questionVersionId', { questionVersionId });
        if (excludeId) {
            query.andWhere('svq.id != :id', { id: excludeId });
        }
        const count = await query.getCount();
        return count > 0;
    }
}
exports.SurveyVersionQuestionRepository = SurveyVersionQuestionRepository;
//# sourceMappingURL=SurveyVersionQuestionRepository.js.map