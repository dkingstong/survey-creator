"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResponseRepository = void 0;
const database_1 = require("../config/database");
const Response_1 = require("../entities/Response");
class ResponseRepository {
    constructor() {
        this.repository = database_1.AppDataSource.getRepository(Response_1.Response);
    }
    async findById(id) {
        return this.repository.findOne({
            where: { id },
            relations: ['surveySession', 'questionVersion']
        });
    }
    async findAll() {
        return this.repository.find({
            relations: ['surveySession', 'questionVersion'],
            order: { created_at: 'DESC' }
        });
    }
    async findBySurveySessionId(surveySessionId) {
        return this.repository.find({
            where: { surveySession: { id: surveySessionId } },
            relations: ['surveySession', 'questionVersion'],
            order: { created_at: 'ASC' }
        });
    }
    async findByQuestionVersionId(questionVersionId) {
        return this.repository.find({
            where: { questionVersion: { id: questionVersionId } },
            relations: ['surveySession', 'questionVersion'],
            order: { created_at: 'DESC' }
        });
    }
    async findByUserId(userId) {
        return this.repository.find({
            where: { surveySession: { user: { id: userId } } },
            relations: ['surveySession', 'questionVersion', 'surveySession.user'],
            order: { created_at: 'DESC' }
        });
    }
    async findBySurveyId(surveyId) {
        return this.repository.find({
            where: { surveySession: { surveyVersion: { survey: { id: surveyId } } } },
            relations: ['surveySession', 'questionVersion', 'surveySession.surveyVersion', 'surveySession.surveyVersion.survey'],
            order: { created_at: 'DESC' }
        });
    }
    async create(responseData) {
        const response = this.repository.create(responseData);
        return this.repository.save(response);
    }
    async update(id, responseData) {
        await this.repository.update(id, responseData);
        return this.findById(id);
    }
    async delete(id) {
        const result = await this.repository.delete(id);
        return result.affected ? result.affected > 0 : false;
    }
    async findBySurveySessionAndQuestion(surveySessionId, questionVersionId) {
        return this.repository.findOne({
            where: {
                surveySession: { id: surveySessionId },
                questionVersion: { id: questionVersionId }
            },
            relations: ['surveySession', 'questionVersion']
        });
    }
    async deleteBySurveySessionId(surveySessionId) {
        const result = await this.repository.delete({ surveySession: { id: surveySessionId } });
        return result.affected ? result.affected > 0 : false;
    }
    async deleteByQuestionVersionId(questionVersionId) {
        const result = await this.repository.delete({ questionVersion: { id: questionVersionId } });
        return result.affected ? result.affected > 0 : false;
    }
}
exports.ResponseRepository = ResponseRepository;
//# sourceMappingURL=ResponseRepository.js.map