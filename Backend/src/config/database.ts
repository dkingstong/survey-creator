import { DataSource } from 'typeorm';
import { User } from '../entities/User';
import { Survey } from '../entities/Survey';
import { SurveyVersion } from '../entities/SurveyVersion';
import { Question } from '../entities/Question';
import { QuestionVersion } from '../entities/QuestionVersion';
import { Option } from '../entities/Options';
import { SurveySession } from '../entities/SurveySession';
import { Response } from '../entities/Response';
import { UserSession } from '../entities/UserSession';
import { SurveyVersionQuestion } from '../entities/SurveyVersionQuestion';

// TypeORM configuration
export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '5432'),
  username: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD || 'password',
  database: process.env.DB_NAME || 'waterlily_db',
  synchronize: process.env.NODE_ENV === 'development', // Auto-sync schema in development
  logging: process.env.NODE_ENV === 'development',
  entities: [User, Survey, SurveyVersion, SurveyVersionQuestion, Question, QuestionVersion, Option, Response, SurveySession, UserSession],
  migrations: ['src/migrations/*.ts'],
  subscribers: [],
});

// Initialize database connection
export const connectDB = async (): Promise<void> => {
  try {
    await AppDataSource.initialize();
    console.log('📦 Connected to PostgreSQL database with TypeORM');
  } catch (error) {
    console.error('❌ Database connection error:', error);
    throw error;
  }
};

// Graceful shutdown
process.on('SIGINT', async () => {
  console.log('🔄 Closing database connections...');
  if (AppDataSource.isInitialized) {
    await AppDataSource.destroy();
  }
  console.log('✅ Database connections closed');
  process.exit(0);
});

export default AppDataSource;
