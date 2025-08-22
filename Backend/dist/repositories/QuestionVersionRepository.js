"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.QuestionVersionRepository = void 0;
const database_1 = require("../config/database");
const QuestionVersion_1 = require("../entities/QuestionVersion");
class QuestionVersionRepository {
    constructor() {
        this.repository = database_1.AppDataSource.getRepository(QuestionVersion_1.QuestionVersion);
    }
    async findById(id) {
        return this.repository.findOne({
            where: { id },
            relations: ['question']
        });
    }
    async findAll() {
        return this.repository.find({
            relations: ['question'],
            order: { created_at: 'DESC' }
        });
    }
    async findByQuestionId(questionId) {
        return this.repository.find({
            where: { question: { id: questionId } },
            relations: ['question'],
            order: { created_at: 'DESC' }
        });
    }
    async findByType(type) {
        return this.repository.find({
            where: { type },
            relations: ['question'],
            order: { created_at: 'DESC' }
        });
    }
    async findActiveQuestionVersions() {
        return this.repository.find({
            where: { is_active: true },
            relations: ['question'],
            order: { created_at: 'DESC' }
        });
    }
    async create(questionVersionData) {
        const questionVersion = this.repository.create(questionVersionData);
        return this.repository.save(questionVersion);
    }
    async update(id, questionVersionData) {
        await this.repository.update(id, questionVersionData);
        return this.findById(id);
    }
    async delete(id) {
        const result = await this.repository.delete(id);
        return result.affected ? result.affected > 0 : false;
    }
    async findByVersion(version, questionId) {
        return this.repository.findOne({
            where: { version, question: { id: questionId } },
            relations: ['question']
        });
    }
    async versionExists(version, questionId, excludeId) {
        const query = this.repository.createQueryBuilder('questionVersion')
            .where('questionVersion.version = :version', { version })
            .andWhere('questionVersion.question.id = :questionId', { questionId });
        if (excludeId) {
            query.andWhere('questionVersion.id != :id', { id: excludeId });
        }
        const count = await query.getCount();
        return count > 0;
    }
}
exports.QuestionVersionRepository = QuestionVersionRepository;
//# sourceMappingURL=QuestionVersionRepository.js.map