import { Repository } from 'typeorm';
import { AppDataSource } from '../config/database';
import { SurveyVersionQuestion } from '../entities/SurveyVersionQuestion';

export class SurveyVersionQuestionRepository {
  private repository: Repository<SurveyVersionQuestion>;

  constructor() {
    this.repository = AppDataSource.getRepository(SurveyVersionQuestion);
  }

  // Find survey version question by ID
  async findById(id: string): Promise<SurveyVersionQuestion | null> {
    return this.repository.findOne({ 
      where: { id },
      relations: ['surveyVersion', 'questionVersion']
    });
  }

  // Find all survey version questions
  async findAll(): Promise<SurveyVersionQuestion[]> {
    return this.repository.find({
      relations: ['surveyVersion', 'questionVersion'],
      order: { order: 'ASC' }
    });
  }

  // Find survey version questions by survey version ID
  async findBySurveyVersionId(surveyVersionId: string): Promise<SurveyVersionQuestion[]> {
    return this.repository.find({
      where: { surveyVersion: { id: surveyVersionId } },
      relations: ['surveyVersion', 'questionVersion'],
      order: { order: 'ASC' }
    });
  }

  // Find survey version questions by question version ID
  async findByQuestionVersionId(questionVersionId: string): Promise<SurveyVersionQuestion[]> {
    return this.repository.find({
      where: { questionVersion: { id: questionVersionId } },
      relations: ['surveyVersion', 'questionVersion'],
      order: { order: 'ASC' }
    });
  }

  // Create new survey version question
  async create(surveyVersionQuestionData: Partial<SurveyVersionQuestion>): Promise<SurveyVersionQuestion> {
    const surveyVersionQuestion = this.repository.create(surveyVersionQuestionData);
    return this.repository.save(surveyVersionQuestion);
  }

  // Update survey version question
  async update(id: string, surveyVersionQuestionData: Partial<SurveyVersionQuestion>): Promise<SurveyVersionQuestion | null> {
    await this.repository.update(id, surveyVersionQuestionData);
    return this.findById(id);
  }

  // Delete survey version question
  async delete(id: string): Promise<boolean> {
    const result = await this.repository.delete(id);
    return result.affected ? result.affected > 0 : false;
  }

  // Delete all survey version questions for a survey version
  async deleteBySurveyVersionId(surveyVersionId: string): Promise<boolean> {
    const result = await this.repository.delete({ surveyVersion: { id: surveyVersionId } });
    return result.affected ? result.affected > 0 : false;
  }

  // Delete all survey version questions for a question version
  async deleteByQuestionVersionId(questionVersionId: string): Promise<boolean> {
    const result = await this.repository.delete({ questionVersion: { id: questionVersionId } });
    return result.affected ? result.affected > 0 : false;
  }

  // Reorder questions in a survey version
  async reorderQuestions(surveyVersionId: string, questionOrders: { id: string; order: number }[]): Promise<void> {
    for (const { id, order } of questionOrders) {
      await this.repository.update(id, { order });
    }
  }

  // Get next order number for a survey version
  async getNextOrder(surveyVersionId: string): Promise<number> {
    const result = await this.repository
      .createQueryBuilder('svq')
      .select('MAX(svq.order)', 'maxOrder')
      .where('svq.surveyVersion.id = :surveyVersionId', { surveyVersionId })
      .getRawOne();

    return (result?.maxOrder || 0) + 1;
  }

  // Check if question already exists in survey version
  async questionExistsInSurveyVersion(surveyVersionId: string, questionVersionId: string, excludeId?: string): Promise<boolean> {
    const query = this.repository.createQueryBuilder('svq')
      .where('svq.surveyVersion.id = :surveyVersionId', { surveyVersionId })
      .andWhere('svq.questionVersion.id = :questionVersionId', { questionVersionId });
    
    if (excludeId) {
      query.andWhere('svq.id != :id', { id: excludeId });
    }

    const count = await query.getCount();
    return count > 0;
  }
}
