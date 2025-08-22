import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, BeforeInsert, BeforeUpdate, JoinColumn, ManyToOne } from 'typeorm';
import { QuestionVersion } from './QuestionVersion';

@Entity('options')
export class Option {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 255 })
  value: string;

  @Column({ type: 'varchar', length: 255 })
  label: string;

  @ManyToOne(() => QuestionVersion, (questionVersion) => questionVersion.id)
  @JoinColumn({ name: 'question_version_id' })
  questionVersion: QuestionVersion;

  @CreateDateColumn({ type: 'timestamp with time zone' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamp with time zone' })
  updated_at: Date;

}
