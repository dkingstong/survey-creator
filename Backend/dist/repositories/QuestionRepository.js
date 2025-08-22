"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.QuestionRepository = void 0;
const database_1 = require("../config/database");
const Question_1 = require("../entities/Question");
class QuestionRepository {
    constructor() {
        this.repository = database_1.AppDataSource.getRepository(Question_1.Question);
    }
    async findById(id) {
        return this.repository.findOne({ where: { id } });
    }
    async findAll() {
        return this.repository.find({
            order: { created_at: 'DESC' }
        });
    }
    async findByType(type) {
        return this.repository.find({
            where: { type },
            order: { created_at: 'DESC' }
        });
    }
    async create(questionData) {
        const question = this.repository.create(questionData);
        return this.repository.save(question);
    }
    async update(id, questionData) {
        await this.repository.update(id, questionData);
        return this.findById(id);
    }
    async delete(id) {
        const result = await this.repository.delete(id);
        return result.affected ? result.affected > 0 : false;
    }
    async findByTitle(title) {
        return this.repository.findOne({ where: { title } });
    }
    async titleExists(title, excludeId) {
        const query = this.repository.createQueryBuilder('question')
            .where('question.title = :title', { title });
        if (excludeId) {
            query.andWhere('question.id != :id', { id: excludeId });
        }
        const count = await query.getCount();
        return count > 0;
    }
}
exports.QuestionRepository = QuestionRepository;
//# sourceMappingURL=QuestionRepository.js.map