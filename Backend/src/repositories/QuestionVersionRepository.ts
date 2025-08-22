import { Repository } from 'typeorm';
import { AppDataSource } from '../config/database';
import { QuestionVersion } from '../entities/QuestionVersion';
import { QuestionType } from '../entities/Question';

export class QuestionVersionRepository {
  private repository: Repository<QuestionVersion>;

  constructor() {
    this.repository = AppDataSource.getRepository(QuestionVersion);
  }

  // Find question version by ID
  async findById(id: string): Promise<QuestionVersion | null> {
    return this.repository.findOne({ 
      where: { id },
      relations: ['question']
    });
  }

  // Find all question versions
  async findAll(): Promise<QuestionVersion[]> {
    return this.repository.find({
      relations: ['question'],
      order: { created_at: 'DESC' }
    });
  }

  // Find question versions by question ID
  async findByQuestionId(questionId: string): Promise<QuestionVersion[]> {
    return this.repository.find({
      where: { question: { id: questionId } },
      relations: ['question'],
      order: { created_at: 'DESC' }
    });
  }

  // Find question versions by type
  async findByType(type: QuestionType): Promise<QuestionVersion[]> {
    return this.repository.find({
      where: { type },
      relations: ['question'],
      order: { created_at: 'DESC' }
    });
  }

  // Find active question versions
  async findActiveQuestionVersions(): Promise<QuestionVersion[]> {
    return this.repository.find({
      where: { is_active: true },
      relations: ['question'],
      order: { created_at: 'DESC' }
    });
  }

  // Create new question version
  async create(questionVersionData: Partial<QuestionVersion>): Promise<QuestionVersion> {
    const questionVersion = this.repository.create(questionVersionData);
    return this.repository.save(questionVersion);
  }

  // Update question version
  async update(id: string, questionVersionData: Partial<QuestionVersion>): Promise<QuestionVersion | null> {
    await this.repository.update(id, questionVersionData);
    return this.findById(id);
  }

  // Delete question version
  async delete(id: string): Promise<boolean> {
    const result = await this.repository.delete(id);
    return result.affected ? result.affected > 0 : false;
  }

  // Find question version by version string
  async findByVersion(version: string, questionId: string): Promise<QuestionVersion | null> {
    return this.repository.findOne({ 
      where: { version, question: { id: questionId } },
      relations: ['question']
    });
  }

  // Check if version exists for a question
  async versionExists(version: string, questionId: string, excludeId?: string): Promise<boolean> {
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
