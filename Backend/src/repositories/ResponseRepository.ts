import { Repository } from 'typeorm';
import { AppDataSource } from '../config/database';
import { Response } from '../entities/Response';

export class ResponseRepository {
  private repository: Repository<Response>;

  constructor() {
    this.repository = AppDataSource.getRepository(Response);
  }

  // Find response by ID
  async findById(id: string): Promise<Response | null> {
    return this.repository.findOne({ 
      where: { id },
      relations: ['surveySession', 'questionVersion']
    });
  }

  // Find all responses
  async findAll(): Promise<Response[]> {
    return this.repository.find({
      relations: ['surveySession', 'questionVersion'],
      order: { created_at: 'DESC' }
    });
  }

  // Find responses by survey session ID
  async findBySurveySessionId(surveySessionId: string): Promise<Response[]> {
    return this.repository.find({
      where: { surveySession: { id: surveySessionId } },
      relations: ['surveySession', 'questionVersion'],
      order: { created_at: 'ASC' }
    });
  }

  // Find responses by question version ID
  async findByQuestionVersionId(questionVersionId: string): Promise<Response[]> {
    return this.repository.find({
      where: { questionVersion: { id: questionVersionId } },
      relations: ['surveySession', 'questionVersion'],
      order: { created_at: 'DESC' }
    });
  }

  // Find responses by user ID (through survey session)
  async findByUserId(userId: string): Promise<Response[]> {
    return this.repository.find({
      where: { surveySession: { user: { id: userId } } },
      relations: ['surveySession', 'questionVersion', 'surveySession.user'],
      order: { created_at: 'DESC' }
    });
  }

  // Find responses by survey ID (through survey session and survey version)
  async findBySurveyId(surveyId: string): Promise<Response[]> {
    return this.repository.find({
      where: { surveySession: { surveyVersion: { survey: { id: surveyId } } } },
      relations: ['surveySession', 'questionVersion', 'surveySession.surveyVersion', 'surveySession.surveyVersion.survey'],
      order: { created_at: 'DESC' }
    });
  }

  // Create new response
  async create(responseData: Partial<Response>): Promise<Response> {
    const response = this.repository.create(responseData);
    return this.repository.save(response);
  }

  // Update response
  async update(id: string, responseData: Partial<Response>): Promise<Response | null> {
    await this.repository.update(id, responseData);
    return this.findById(id);
  }

  // Delete response
  async delete(id: string): Promise<boolean> {
    const result = await this.repository.delete(id);
    return result.affected ? result.affected > 0 : false;
  }

  // Find response by survey session and question version
  async findBySurveySessionAndQuestion(surveySessionId: string, questionVersionId: string): Promise<Response | null> {
    return this.repository.findOne({ 
      where: { 
        surveySession: { id: surveySessionId },
        questionVersion: { id: questionVersionId }
      },
      relations: ['surveySession', 'questionVersion']
    });
  }

  // Delete all responses for a survey session
  async deleteBySurveySessionId(surveySessionId: string): Promise<boolean> {
    const result = await this.repository.delete({ surveySession: { id: surveySessionId } });
    return result.affected ? result.affected > 0 : false;
  }

  // Delete all responses for a question version
  async deleteByQuestionVersionId(questionVersionId: string): Promise<boolean> {
    const result = await this.repository.delete({ questionVersion: { id: questionVersionId } });
    return result.affected ? result.affected > 0 : false;
  }
}
