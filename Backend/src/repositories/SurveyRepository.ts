import { Repository } from 'typeorm';
import { AppDataSource } from '../config/database';
import { Survey } from '../entities/Survey';

export class SurveyRepository {
  private repository: Repository<Survey>;

  constructor() {
    this.repository = AppDataSource.getRepository(Survey);
  }

  // Find survey by ID
  async findById(id: string): Promise<Survey | null> {
    return this.repository.findOne({ where: { id } });
  }

  // Find all surveys
  async findAll(): Promise<Survey[]> {
    return this.repository.find({
      order: { created_at: 'DESC' }
    });
  }

  // Create new survey
  async create(surveyData: Partial<Survey>): Promise<Survey> {
    const survey = this.repository.create(surveyData);
    return this.repository.save(survey);
  }

  // Update survey
  async update(id: string, surveyData: Partial<Survey>): Promise<Survey | null> {
    await this.repository.update(id, surveyData);
    return this.findById(id);
  }

  // Delete survey
  async delete(id: string): Promise<boolean> {
    const result = await this.repository.delete(id);
    return result.affected ? result.affected > 0 : false;
  }

  // Find survey by name
  async findByName(name: string): Promise<Survey | null> {
    return this.repository.findOne({ where: { name } });
  }

  // Check if survey name exists
  async nameExists(name: string, excludeId?: string): Promise<boolean> {
    const query = this.repository.createQueryBuilder('survey')
      .where('survey.name = :name', { name });
    
    if (excludeId) {
      query.andWhere('survey.id != :id', { id: excludeId });
    }

    const count = await query.getCount();
    return count > 0;
  }
}
