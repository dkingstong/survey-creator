import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, BeforeInsert, BeforeUpdate, ManyToOne, JoinColumn, Index } from 'typeorm';
import { Survey } from './Survey';

@Entity('survey_versions')
export class SurveyVersion {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Column({ type: 'varchar', length: 255 })
  description: string;

  @Column({ type: 'varchar', length: 255 })
  version: string;

  @Index()
  @Column({ type: 'boolean', default: true })
  is_active: boolean;

  @ManyToOne(() => Survey, (survey) => survey.id)
  @JoinColumn({ name: 'survey_id' })
  survey: Survey;

  @CreateDateColumn({ type: 'timestamp with time zone' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamp with time zone' })
  updated_at: Date;

}
