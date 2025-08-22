import { Repository } from 'typeorm';
import { AppDataSource } from '../config/database';
import { Question, QuestionType } from '../entities/Question';

export class QuestionRepository {
  private repository: Repository<Question>;

  constructor() {
    this.repository = AppDataSource.getRepository(Question);
  }

  // Find question by ID
  async findById(id: string): Promise<Question | null> {
    return this.repository.findOne({ where: { id } });
  }

  // Find all questions
  async findAll(): Promise<Question[]> {
    return this.repository.find({
      order: { created_at: 'DESC' }
    });
  }

  // Find questions by type
  async findByType(type: QuestionType): Promise<Question[]> {
    return this.repository.find({
      where: { type },
      order: { created_at: 'DESC' }
    });
  }

  // Create new question
  async create(questionData: Partial<Question>): Promise<Question> {
    const question = this.repository.create(questionData);
    return this.repository.save(question);
  }

  // Update question
  async update(id: string, questionData: Partial<Question>): Promise<Question | null> {
    await this.repository.update(id, questionData);
    return this.findById(id);
  }

  // Delete question
  async delete(id: string): Promise<boolean> {
    const result = await this.repository.delete(id);
    return result.affected ? result.affected > 0 : false;
  }

  // Find question by title
  async findByTitle(title: string): Promise<Question | null> {
    return this.repository.findOne({ where: { title } });
  }

  // Check if question title exists
  async titleExists(title: string, excludeId?: string): Promise<boolean> {
    const query = this.repository.createQueryBuilder('question')
      .where('question.title = :title', { title });
    
    if (excludeId) {
      query.andWhere('question.id != :id', { id: excludeId });
    }

    const count = await query.getCount();
    return count > 0;
  }
}
