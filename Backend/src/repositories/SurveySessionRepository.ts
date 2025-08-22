import { Repository } from 'typeorm';
import { AppDataSource } from '../config/database';
import { SurveySession } from '../entities/SurveySession';

export class SurveySessionRepository {
  private repository: Repository<SurveySession>;

  constructor() {
    this.repository = AppDataSource.getRepository(SurveySession);
  }

  // Find survey session by ID
  async findById(id: string): Promise<SurveySession | null> {
    return this.repository.findOne({ 
      where: { id },
      relations: ['user', 'surveyVersion']
    });
  }

  // Find all survey sessions
  async findAll(): Promise<SurveySession[]> {
    return this.repository.find({
      relations: ['user', 'surveyVersion'],
      order: { created_at: 'DESC' }
    });
  }

  // Find survey sessions by user ID
  async findByUserId(userId: string): Promise<SurveySession[]> {
    return this.repository.find({
      where: { user: { id: userId } },
      relations: ['user', 'surveyVersion'],
      order: { created_at: 'DESC' }
    });
  }

  // Find survey sessions by survey version ID
  async findBySurveyVersionId(surveyVersionId: string): Promise<SurveySession[]> {
    return this.repository.find({
      where: { surveyVersion: { id: surveyVersionId } },
      relations: ['user', 'surveyVersion'],
      order: { created_at: 'DESC' }
    });
  }

  // Find survey sessions by survey ID (through survey version)
  async findBySurveyId(surveyId: string): Promise<SurveySession[]> {
    return this.repository.find({
      where: { surveyVersion: { survey: { id: surveyId } } },
      relations: ['user', 'surveyVersion', 'surveyVersion.survey'],
      order: { created_at: 'DESC' }
    });
  }

  // Create new survey session
  async create(surveySessionData: Partial<SurveySession>): Promise<SurveySession> {
    const surveySession = this.repository.create(surveySessionData);
    return this.repository.save(surveySession);
  }

  // Update survey session
  async update(id: string, surveySessionData: Partial<SurveySession>): Promise<SurveySession | null> {
    await this.repository.update(id, surveySessionData);
    return this.findById(id);
  }

  // Delete survey session
  async delete(id: string): Promise<boolean> {
    const result = await this.repository.delete(id);
    return result.affected ? result.affected > 0 : false;
  }

  // Find survey session by name
  async findByName(name: string, userId: string): Promise<SurveySession | null> {
    return this.repository.findOne({ 
      where: { name, user: { id: userId } },
      relations: ['user', 'surveyVersion']
    });
  }

  // Check if survey session name exists for a user
  async nameExists(name: string, userId: string, excludeId?: string): Promise<boolean> {
    const query = this.repository.createQueryBuilder('surveySession')
      .where('surveySession.name = :name', { name })
      .andWhere('surveySession.user.id = :userId', { userId });
    
    if (excludeId) {
      query.andWhere('surveySession.id != :id', { id: excludeId });
    }

    const count = await query.getCount();
    return count > 0;
  }

  // Delete all survey sessions for a user
  async deleteByUserId(userId: string): Promise<boolean> {
    const result = await this.repository.delete({ user: { id: userId } });
    return result.affected ? result.affected > 0 : false;
  }
}
