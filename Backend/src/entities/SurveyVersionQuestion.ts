import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, BeforeInsert, BeforeUpdate, ManyToOne, JoinColumn } from 'typeorm';
import { SurveyVersion } from './SurveyVersion';
import { QuestionVersion } from './QuestionVersion';

@Entity('survey_version_questions')
export class SurveyVersionQuestion {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => SurveyVersion, (surveyVersion) => surveyVersion.id)
  @JoinColumn({ name: 'survey_version_id' })
  surveyVersion: SurveyVersion;

  @ManyToOne(() => QuestionVersion, (questionVersion) => questionVersion.id)
  @JoinColumn({ name: 'question_version_id' })
  questionVersion: QuestionVersion;

  @Column({ type: 'integer' })
  order: number;

  @CreateDateColumn({ type: 'timestamp with time zone' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamp with time zone' })
  updated_at: Date;

}
