"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRepository = void 0;
const database_1 = require("../config/database");
const User_1 = require("../entities/User");
class UserRepository {
    constructor() {
        this.repository = database_1.AppDataSource.getRepository(User_1.User);
    }
    async findByEmail(email) {
        return this.repository.findOne({ where: { email } });
    }
    async findById(id) {
        return this.repository.findOne({ where: { id } });
    }
    async findAll() {
        const users = await this.repository.find();
        return users.map(user => user.toJSON());
    }
    async create(userData) {
        const user = this.repository.create(userData);
        return this.repository.save(user);
    }
    async update(id, userData) {
        await this.repository.update(id, userData);
        return this.findById(id);
    }
    async delete(id) {
        const result = await this.repository.delete(id);
        return result.affected ? result.affected > 0 : false;
    }
    async emailExists(email, excludeId) {
        const query = this.repository.createQueryBuilder('user')
            .where('user.email = :email', { email });
        if (excludeId) {
            query.andWhere('user.id != :id', { id: excludeId });
        }
        const count = await query.getCount();
        return count > 0;
    }
}
exports.UserRepository = UserRepository;
//# sourceMappingURL=UserRepository.js.map