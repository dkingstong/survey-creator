import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, BeforeInsert, BeforeUpdate, ManyToOne, JoinColumn } from 'typeorm';
import { User } from './User';
import { SurveyVersion } from './SurveyVersion';

export enum SurveyStatus {
  in_progress = 'in_progress',
  completed = 'completed',
}

@Entity('survey_sessions')
export class SurveySession {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 255 })
  name: string;

  @ManyToOne(() => User, (user) => user.id)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToOne(() => SurveyVersion, (surveyVersion) => surveyVersion.id)
  @JoinColumn({ name: 'survey_version_id' })
  surveyVersion: SurveyVersion;

  @Column({ type: 'varchar', length: 255, default: 'in_progress' })
  status: string;

  @Column({ type: 'integer', default: 0 })
  question_number: number;

  @CreateDateColumn({ type: 'timestamp with time zone' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamp with time zone' })
  updated_at: Date;

}
