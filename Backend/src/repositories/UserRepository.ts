import { Repository } from 'typeorm';
import { AppDataSource } from '../config/database';
import { User } from '../entities/User';

export class UserRepository {
  private repository: Repository<User>;

  constructor() {
    this.repository = AppDataSource.getRepository(User);
  }

  // Find user by email
  async findByEmail(email: string): Promise<User | null> {
    return this.repository.findOne({ where: { email } });
  }

  // Find user by ID
  async findById(id: string): Promise<User | null> {
    return this.repository.findOne({ where: { id } });
  }

  // Find all users (without password)
  async findAll(): Promise<Partial<User>[]> {
    const users = await this.repository.find();
    return users.map(user => user.toJSON());
  }

  // Create new user
  async create(userData: Partial<User>): Promise<User> {
    const user = this.repository.create(userData);
    return this.repository.save(user);
  }

  // Update user
  async update(id: string, userData: Partial<User>): Promise<User | null> {
    await this.repository.update(id, userData);
    return this.findById(id);
  }

  // Delete user
  async delete(id: string): Promise<boolean> {
    const result = await this.repository.delete(id);
    return result.affected ? result.affected > 0 : false;
  }

  // Check if email exists
  async emailExists(email: string, excludeId?: string): Promise<boolean> {
    const query = this.repository.createQueryBuilder('user')
      .where('user.email = :email', { email });
    
    if (excludeId) {
      query.andWhere('user.id != :id', { id: excludeId });
    }

    const count = await query.getCount();
    return count > 0;
  }
}
