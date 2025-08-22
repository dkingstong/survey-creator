import { Repository } from 'typeorm';
import { AppDataSource } from '../config/database';
import { Option } from '../entities/Options';

export class OptionRepository {
  private repository: Repository<Option>;

  constructor() {
    this.repository = AppDataSource.getRepository(Option);
  }

  // Find option by ID
  async findById(id: string): Promise<Option | null> {
    return this.repository.findOne({ 
      where: { id },
      relations: ['questionVersion']
    });
  }

  // Find all options
  async findAll(): Promise<Option[]> {
    return this.repository.find({
      relations: ['questionVersion'],
      order: { created_at: 'DESC' }
    });
  }

  // Find options by question version ID
  async findByQuestionVersionId(questionVersionId: string): Promise<Option[]> {
    return this.repository.find({
      where: { questionVersion: { id: questionVersionId } },
      relations: ['questionVersion'],
      order: { created_at: 'ASC' }
    });
  }

  // Create new option
  async create(optionData: Partial<Option>): Promise<Option> {
    const option = this.repository.create(optionData);
    return this.repository.save(option);
  }

  // Update option
  async update(id: string, optionData: Partial<Option>): Promise<Option | null> {
    await this.repository.update(id, optionData);
    return this.findById(id);
  }

  // Delete option
  async delete(id: string): Promise<boolean> {
    const result = await this.repository.delete(id);
    return result.affected ? result.affected > 0 : false;
  }

  // Find option by value
  async findByValue(value: string, questionVersionId: string): Promise<Option | null> {
    return this.repository.findOne({ 
      where: { value, questionVersion: { id: questionVersionId } },
      relations: ['questionVersion']
    });
  }

  // Check if option value exists for a question version
  async valueExists(value: string, questionVersionId: string, excludeId?: string): Promise<boolean> {
    const query = this.repository.createQueryBuilder('option')
      .where('option.value = :value', { value })
      .andWhere('option.questionVersion.id = :questionVersionId', { questionVersionId });
    
    if (excludeId) {
      query.andWhere('option.id != :id', { id: excludeId });
    }

    const count = await query.getCount();
    return count > 0;
  }

  // Delete all options for a question version
  async deleteByQuestionVersionId(questionVersionId: string): Promise<boolean> {
    const result = await this.repository.delete({ questionVersion: { id: questionVersionId } });
    return result.affected ? result.affected > 0 : false;
  }
}
