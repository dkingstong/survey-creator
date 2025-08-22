"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const database_1 = require("../config/database");
const SurveyRepository_1 = require("../repositories/SurveyRepository");
const SurveyVersionRepository_1 = require("../repositories/SurveyVersionRepository");
const QuestionRepository_1 = require("../repositories/QuestionRepository");
const QuestionVersionRepository_1 = require("../repositories/QuestionVersionRepository");
const SurveyVersionQuestionRepository_1 = require("../repositories/SurveyVersionQuestionRepository");
const Question_1 = require("../entities/Question");
async function seedData() {
    try {
        await database_1.AppDataSource.initialize();
        console.log('📦 Connected to database');
        const surveyRepo = new SurveyRepository_1.SurveyRepository();
        const surveyVersionRepo = new SurveyVersionRepository_1.SurveyVersionRepository();
        const questionRepo = new QuestionRepository_1.QuestionRepository();
        const questionVersionRepo = new QuestionVersionRepository_1.QuestionVersionRepository();
        const surveyVersionQuestionRepo = new SurveyVersionQuestionRepository_1.SurveyVersionQuestionRepository();
        console.log('Creating survey...');
        const survey = await surveyRepo.create({
            name: 'Customer Satisfaction Survey',
            description: 'A comprehensive survey to measure customer satisfaction with our products and services'
        });
        console.log(`✅ Survey created: ${survey.name} (ID: ${survey.id})`);
        console.log('Creating survey version...');
        const surveyVersion = await surveyVersionRepo.create({
            name: 'v1.0',
            description: 'Initial version of the customer satisfaction survey',
            version: '1.0.0',
            survey: survey
        });
        console.log(`✅ Survey version created: ${surveyVersion.name} (ID: ${surveyVersion.id})`);
        const questions = [
            {
                title: 'How satisfied are you with our product?',
                description: 'Please rate your overall satisfaction with our product',
                type: Question_1.QuestionType.TEXT,
                metadata: {}
            },
            {
                title: 'What is your primary reason for using our service?',
                description: 'Please select the main reason you chose our service',
                type: Question_1.QuestionType.TEXT,
                metadata: {}
            },
            {
                title: 'Which features do you find most valuable?',
                description: 'Select all features that you find valuable (multiple choice)',
                type: Question_1.QuestionType.TEXT,
                metadata: {}
            }
        ];
        const createdQuestions = [];
        for (const questionData of questions) {
            console.log(`Creating question: ${questionData.title}...`);
            const question = await questionRepo.create(questionData);
            createdQuestions.push(question);
            console.log(`✅ Question created: ${question.title} (ID: ${question.id})`);
        }
        console.log('Creating question versions...');
        const questionVersions = [];
        for (let i = 0; i < createdQuestions.length; i++) {
            const question = createdQuestions[i];
            const questionVersion = await questionVersionRepo.create({
                title: question.title,
                description: question.description,
                type: question.type,
                version: '1.0.0',
                question: question,
                metadata: question.metadata
            });
            questionVersions.push(questionVersion);
            console.log(`✅ Question version created: ${questionVersion.title} (ID: ${questionVersion.id})`);
        }
        console.log('Creating survey version questions...');
        const surveyVersionQuestions = [];
        for (let i = 0; i < questionVersions.length; i++) {
            const questionVersion = questionVersions[i];
            const surveyVersionQuestion = await surveyVersionQuestionRepo.create({
                surveyVersion: surveyVersion,
                questionVersion: questionVersion,
                order: i
            });
            surveyVersionQuestions.push(surveyVersionQuestion);
            console.log(`✅ Survey version question created: Order ${i + 1} (ID: ${surveyVersionQuestion.id})`);
        }
        console.log('\n🎉 Seeding completed successfully!');
        console.log('\n📊 Summary:');
        console.log(`- Survey: ${survey.name} (${survey.id})`);
        console.log(`- Survey Version: ${surveyVersion.name} (${surveyVersion.id})`);
        console.log(`- Questions: ${createdQuestions.length}`);
        console.log(`- Question Versions: ${questionVersions.length}`);
        console.log(`- Survey Version Questions: ${surveyVersionQuestions.length}`);
        console.log('\n🔗 You can now use these IDs to create survey sessions and responses.');
        console.log(`📝 Survey Version ID for sessions: ${surveyVersion.id}`);
    }
    catch (error) {
        console.error('❌ Seeding failed:', error);
        process.exit(1);
    }
    finally {
        if (database_1.AppDataSource.isInitialized) {
            await database_1.AppDataSource.destroy();
            console.log('📦 Database connection closed');
        }
    }
}
seedData();
//# sourceMappingURL=seedData.js.map