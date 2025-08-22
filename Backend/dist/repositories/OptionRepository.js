"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OptionRepository = void 0;
const database_1 = require("../config/database");
const Options_1 = require("../entities/Options");
class OptionRepository {
    constructor() {
        this.repository = database_1.AppDataSource.getRepository(Options_1.Option);
    }
    async findById(id) {
        return this.repository.findOne({
            where: { id },
            relations: ['questionVersion']
        });
    }
    async findAll() {
        return this.repository.find({
            relations: ['questionVersion'],
            order: { created_at: 'DESC' }
        });
    }
    async findByQuestionVersionId(questionVersionId) {
        return this.repository.find({
            where: { questionVersion: { id: questionVersionId } },
            relations: ['questionVersion'],
            order: { created_at: 'ASC' }
        });
    }
    async create(optionData) {
        const option = this.repository.create(optionData);
        return this.repository.save(option);
    }
    async update(id, optionData) {
        await this.repository.update(id, optionData);
        return this.findById(id);
    }
    async delete(id) {
        const result = await this.repository.delete(id);
        return result.affected ? result.affected > 0 : false;
    }
    async findByValue(value, questionVersionId) {
        return this.repository.findOne({
            where: { value, questionVersion: { id: questionVersionId } },
            relations: ['questionVersion']
        });
    }
    async valueExists(value, questionVersionId, excludeId) {
        const query = this.repository.createQueryBuilder('option')
            .where('option.value = :value', { value })
            .andWhere('option.questionVersion.id = :questionVersionId', { questionVersionId });
        if (excludeId) {
            query.andWhere('option.id != :id', { id: excludeId });
        }
        const count = await query.getCount();
        return count > 0;
    }
    async deleteByQuestionVersionId(questionVersionId) {
        const result = await this.repository.delete({ questionVersion: { id: questionVersionId } });
        return result.affected ? result.affected > 0 : false;
    }
}
exports.OptionRepository = OptionRepository;
//# sourceMappingURL=OptionRepository.js.map