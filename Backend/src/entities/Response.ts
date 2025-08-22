import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { SurveySession } from './SurveySession';
import { QuestionVersion } from './QuestionVersion';

@Entity('responses')
export class Response {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => SurveySession, (surveySession) => surveySession.id)
  @JoinColumn({ name: 'survey_session_id' })
  surveySession: SurveySession;

  @ManyToOne(() => QuestionVersion, (questionVersion) => questionVersion.id)
  @JoinColumn({ name: 'question_version_id' })
  questionVersion: QuestionVersion;

  @Column({ type: 'jsonb' })
  value: Record<string, any>;

  @CreateDateColumn({ type: 'timestamp with time zone' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamp with time zone' })
  updated_at: Date;

}
