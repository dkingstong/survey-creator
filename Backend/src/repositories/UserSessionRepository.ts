import { Repository } from 'typeorm';
import { AppDataSource } from '../config/database';
import { UserSession } from '../entities/UserSession';

export class UserSessionRepository {
  private repository: Repository<UserSession>;

  constructor() {
    this.repository = AppDataSource.getRepository(UserSession);
  }

  // Find user session by ID
  async findById(id: string): Promise<UserSession | null> {
    return this.repository.findOne({ 
      where: { id },
      relations: ['user']
    });
  }

  // Find all user sessions
  async findAll(): Promise<UserSession[]> {
    return this.repository.find({
      relations: ['user'],
      order: { created_at: 'DESC' }
    });
  }

  // Find user sessions by user ID
  async findByUserId(userId: string): Promise<UserSession[]> {
    return this.repository.find({
      where: { user: { id: userId } },
      relations: ['user'],
      order: { created_at: 'DESC' }
    });
  }

  // Find user session by refresh token
  async findByRefreshToken(refreshToken: string): Promise<UserSession | null> {
    return this.repository.findOne({ 
      where: { refresh_token: refreshToken },
      relations: ['user']
    });
  }

  // Create new user session
  async create(userSessionData: Partial<UserSession>): Promise<UserSession> {
    const userSession = this.repository.create(userSessionData);
    return this.repository.save(userSession);
  }

  // Update user session
  async update(id: string, userSessionData: Partial<UserSession>): Promise<UserSession | null> {
    await this.repository.update(id, userSessionData);
    return this.findById(id);
  }

  // Delete user session
  async delete(id: string): Promise<boolean> {
    const result = await this.repository.delete(id);
    return result.affected ? result.affected > 0 : false;
  }

  // Delete user session by refresh token
  async deleteByRefreshToken(refreshToken: string): Promise<boolean> {
    const result = await this.repository.delete({ refresh_token: refreshToken });
    return result.affected ? result.affected > 0 : false;
  }

  // Delete all user sessions for a user
  async deleteByUserId(userId: string): Promise<boolean> {
    const result = await this.repository.delete({ user: { id: userId } });
    return result.affected ? result.affected > 0 : false;
  }

  // Check if refresh token exists
  async refreshTokenExists(refreshToken: string, excludeId?: string): Promise<boolean> {
    const query = this.repository.createQueryBuilder('userSession')
      .where('userSession.refresh_token = :refreshToken', { refreshToken });
    
    if (excludeId) {
      query.andWhere('userSession.id != :id', { id: excludeId });
    }

    const count = await query.getCount();
    return count > 0;
  }

  // Clean up expired sessions (older than specified days)
  async cleanupExpiredSessions(daysOld: number): Promise<number> {
    const cutoffDate = new Date();
    cutoffDate.setDate(cutoffDate.getDate() - daysOld);

    const result = await this.repository
      .createQueryBuilder()
      .delete()
      .where('created_at < :cutoffDate', { cutoffDate })
      .execute();

    return result.affected || 0;
  }
}
