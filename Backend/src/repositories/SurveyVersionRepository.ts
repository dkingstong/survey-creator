import { Repository } from 'typeorm';
import { AppDataSource } from '../config/database';
import { SurveyVersion } from '../entities/SurveyVersion';

export class SurveyVersionRepository {
  private repository: Repository<SurveyVersion>;

  constructor() {
    this.repository = AppDataSource.getRepository(SurveyVersion);
  }

  // Find survey version by ID
  async findById(id: string): Promise<SurveyVersion | null> {
    return this.repository.findOne({ 
      where: { id },
      relations: ['survey']
    });
  }

  // Find all survey versions
  async findAll(): Promise<SurveyVersion[]> {
    return this.repository.find({
      relations: ['survey'],
      order: { created_at: 'DESC' }
    });
  }

  // Find survey versions by survey ID
  async findBySurveyId(surveyId: string): Promise<SurveyVersion[]> {
    return this.repository.find({
      where: { survey: { id: surveyId } },
      relations: ['survey'],
      order: { created_at: 'DESC' }
    });
  }

  async findActiveSurveys(): Promise<SurveyVersion[]> {
    return this.repository.find({
      where: { is_active: true },
      relations: ['survey'],
      order: { created_at: 'DESC' }
    });
  }

  // Create new survey version
  async create(surveyVersionData: Partial<SurveyVersion>): Promise<SurveyVersion> {
    const surveyVersion = this.repository.create(surveyVersionData);
    return this.repository.save(surveyVersion);
  }

  // Update survey version
  async update(id: string, surveyVersionData: Partial<SurveyVersion>): Promise<SurveyVersion | null> {
    await this.repository.update(id, surveyVersionData);
    return this.findById(id);
  }

  // Delete survey version
  async delete(id: string): Promise<boolean> {
    const result = await this.repository.delete(id);
    return result.affected ? result.affected > 0 : false;
  }

  // Find survey version by version string
  async findByVersion(version: string, surveyId: string): Promise<SurveyVersion | null> {
    return this.repository.findOne({ 
      where: { version, survey: { id: surveyId } },
      relations: ['survey']
    });
  }

  // Check if version exists for a survey
  async versionExists(version: string, surveyId: string, excludeId?: string): Promise<boolean> {
    const query = this.repository.createQueryBuilder('surveyVersion')
      .where('surveyVersion.version = :version', { version })
      .andWhere('surveyVersion.survey.id = :surveyId', { surveyId });
    
    if (excludeId) {
      query.andWhere('surveyVersion.id != :id', { id: excludeId });
    }

    const count = await query.getCount();
    return count > 0;
  }
}
