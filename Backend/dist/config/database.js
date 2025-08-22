"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectDB = exports.AppDataSource = void 0;
const typeorm_1 = require("typeorm");
const User_1 = require("../entities/User");
const Survey_1 = require("../entities/Survey");
const SurveyVersion_1 = require("../entities/SurveyVersion");
const Question_1 = require("../entities/Question");
const QuestionVersion_1 = require("../entities/QuestionVersion");
const Options_1 = require("../entities/Options");
const SurveySession_1 = require("../entities/SurveySession");
const Response_1 = require("../entities/Response");
const UserSession_1 = require("../entities/UserSession");
const SurveyVersionQuestion_1 = require("../entities/SurveyVersionQuestion");
exports.AppDataSource = new typeorm_1.DataSource({
    type: 'postgres',
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT || '5432'),
    username: process.env.DB_USER || 'postgres',
    password: process.env.DB_PASSWORD || 'password',
    database: process.env.DB_NAME || 'waterlily_db',
    synchronize: process.env.NODE_ENV === 'development',
    logging: process.env.NODE_ENV === 'development',
    entities: [User_1.User, Survey_1.Survey, SurveyVersion_1.SurveyVersion, SurveyVersionQuestion_1.SurveyVersionQuestion, Question_1.Question, QuestionVersion_1.QuestionVersion, Options_1.Option, Response_1.Response, SurveySession_1.SurveySession, UserSession_1.UserSession],
    migrations: ['src/migrations/*.ts'],
    subscribers: [],
});
const connectDB = async () => {
    try {
        await exports.AppDataSource.initialize();
        console.log('📦 Connected to PostgreSQL database with TypeORM');
    }
    catch (error) {
        console.error('❌ Database connection error:', error);
        throw error;
    }
};
exports.connectDB = connectDB;
process.on('SIGINT', async () => {
    console.log('🔄 Closing database connections...');
    if (exports.AppDataSource.isInitialized) {
        await exports.AppDataSource.destroy();
    }
    console.log('✅ Database connections closed');
    process.exit(0);
});
exports.default = exports.AppDataSource;
//# sourceMappingURL=database.js.map