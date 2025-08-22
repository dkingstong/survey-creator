import 'reflect-metadata';
import { AppDataSource } from '../config/database';
import { SurveyRepository } from '../repositories/SurveyRepository';
import { SurveyVersionRepository } from '../repositories/SurveyVersionRepository';
import { QuestionRepository } from '../repositories/QuestionRepository';
import { QuestionVersionRepository } from '../repositories/QuestionVersionRepository';
import { SurveyVersionQuestionRepository } from '../repositories/SurveyVersionQuestionRepository';
import { QuestionType } from '../entities/Question';

// Define survey data structure
interface SurveyData {
  name: string;
  description: string;
  version: {
    name: string;
    description: string;
    version: string;
  };
  questions: Array<{
    title: string;
    description: string;
    type: QuestionType;
    metadata: any;
  }>;
}

// Sample survey data
const surveyData: SurveyData[] = [
  {
    name: 'Customer Satisfaction Survey',
    description: 'A comprehensive survey to measure customer satisfaction with our products and services',
    version: {
      name: 'v1.0',
      description: 'Initial version of the customer satisfaction survey',
      version: '1.0.0'
    },
    questions: [
      {
        title: 'How satisfied are you with our product?',
        description: 'Please rate your overall satisfaction with our product',
        type: QuestionType.TEXT,
        metadata: {}
      },
      {
        title: 'What is your primary reason for using our service?',
        description: 'Please select the main reason you chose our service',
        type: QuestionType.TEXT,
        metadata: {}
      },
      {
        title: 'Which features do you find most valuable?',
        description: 'Select all features that you find valuable (multiple choice)',
        type: QuestionType.TEXT,
        metadata: {}
      }
    ]
  },
  {
    name: 'Employee Engagement Survey',
    description: 'Survey to measure employee satisfaction and engagement levels',
    version: {
      name: 'v1.0',
      description: 'Initial version of the employee engagement survey',
      version: '1.0.0'
    },
    questions: [
      {
        title: 'How satisfied are you with your current role?',
        description: 'Rate your satisfaction with your current position and responsibilities',
        type: QuestionType.TEXT,
        metadata: {}
      },
      {
        title: 'How likely are you to recommend this company as a place to work?',
        description: 'Rate on a scale of 1-10 how likely you are to recommend us',
        type: QuestionType.TEXT,
        metadata: {}
      },
      {
        title: 'What would improve your work experience?',
        description: 'Please share suggestions for improving the workplace environment',
        type: QuestionType.TEXT,
        metadata: {}
      },
      {
        title: 'How well do you feel supported by your manager?',
        description: 'Rate the level of support you receive from your direct supervisor',
        type: QuestionType.TEXT,
        metadata: {}
      }
    ]
  },
  {
    name: 'Product Feedback Survey',
    description: 'Gather feedback on new product features and user experience',
    version: {
      name: 'v1.0',
      description: 'Initial version of the product feedback survey',
      version: '1.0.0'
    },
    questions: [
      {
        title: 'How easy was it to use our new feature?',
        description: 'Rate the usability of the recently launched feature',
        type: QuestionType.TEXT,
        metadata: {}
      },
      {
        title: 'What problems did you encounter while using the feature?',
        description: 'Please describe any issues or difficulties you experienced',
        type: QuestionType.TEXT,
        metadata: {}
      },
      {
        title: 'What additional features would you like to see?',
        description: 'Share your ideas for future product improvements',
        type: QuestionType.TEXT,
        metadata: {}
      }
    ]
  },
  {
    name: 'Market Research Survey',
    description: 'Research survey to understand market trends and customer preferences',
    version: {
      name: 'v1.0',
      description: 'Initial version of the market research survey',
      version: '1.0.0'
    },
    questions: [
      {
        title: 'What is your age group?',
        description: 'Please select your age range',
        type: QuestionType.TEXT,
        metadata: {}
      },
      {
        title: 'What is your primary occupation?',
        description: 'Please describe your main profession or job role',
        type: QuestionType.TEXT,
        metadata: {}
      },
      {
        title: 'How much do you typically spend on similar products?',
        description: 'Please indicate your typical spending range',
        type: QuestionType.TEXT,
        metadata: {}
      },
      {
        title: 'What factors influence your purchasing decisions?',
        description: 'Select the most important factors when making purchases',
        type: QuestionType.TEXT,
        metadata: {}
      },
      {
        title: 'Where do you usually discover new products?',
        description: 'Please indicate your primary source for finding new products',
        type: QuestionType.TEXT,
        metadata: {}
      }
    ]
  }
];

async function createSurveyWithData(
  surveyData: SurveyData,
  surveyRepo: SurveyRepository,
  surveyVersionRepo: SurveyVersionRepository,
  questionRepo: QuestionRepository,
  questionVersionRepo: QuestionVersionRepository,
  surveyVersionQuestionRepo: SurveyVersionQuestionRepository
) {
  console.log(`\n📋 Creating survey: ${surveyData.name}...`);
  
  // Create Survey
  const survey = await surveyRepo.create({
    name: surveyData.name,
    description: surveyData.description
  });
  console.log(`✅ Survey created: ${survey.name} (ID: ${survey.id})`);

  // Create Survey Version
  const surveyVersion = await surveyVersionRepo.create({
    name: surveyData.version.name,
    description: surveyData.version.description,
    version: surveyData.version.version,
    survey: survey
  });
  console.log(`✅ Survey version created: ${surveyVersion.name} (ID: ${surveyVersion.id})`);

  // Create Questions
  const createdQuestions = [];
  for (const questionData of surveyData.questions) {
    console.log(`  Creating question: ${questionData.title}...`);
    const question = await questionRepo.create(questionData);
    createdQuestions.push(question);
    console.log(`  ✅ Question created: ${question.title} (ID: ${question.id})`);
  }

  // Create Question Versions
  const questionVersions = [];
  for (const question of createdQuestions) {
    const questionVersion = await questionVersionRepo.create({
      title: question.title,
      description: question.description,
      type: question.type,
      version: '1.0.0',
      question: question,
      metadata: question.metadata
    });
    questionVersions.push(questionVersion);
    console.log(`  ✅ Question version created: ${questionVersion.title} (ID: ${questionVersion.id})`);
  }

  // Create Survey Version Questions (link survey version to question versions)
  const surveyVersionQuestions = [];
  for (let i = 0; i < questionVersions.length; i++) {
    const questionVersion = questionVersions[i];
    const surveyVersionQuestion = await surveyVersionQuestionRepo.create({
      surveyVersion: surveyVersion,
      questionVersion: questionVersion,
      order: i
    });
    surveyVersionQuestions.push(surveyVersionQuestion);
    console.log(`  ✅ Survey version question created: Order ${i + 1} (ID: ${surveyVersionQuestion.id})`);
  }

  return {
    survey,
    surveyVersion,
    questions: createdQuestions,
    questionVersions,
    surveyVersionQuestions
  };
}

async function seedData() {
  try {
    // Initialize database connection
    await AppDataSource.initialize();
    console.log('📦 Connected to database');

    const surveyRepo = new SurveyRepository();
    const surveyVersionRepo = new SurveyVersionRepository();
    const questionRepo = new QuestionRepository();
    const questionVersionRepo = new QuestionVersionRepository();
    const surveyVersionQuestionRepo = new SurveyVersionQuestionRepository();

    const results = [];

    // Create all surveys with their data
    for (const surveyDataItem of surveyData) {
      const result = await createSurveyWithData(
        surveyDataItem,
        surveyRepo,
        surveyVersionRepo,
        questionRepo,
        questionVersionRepo,
        surveyVersionQuestionRepo
      );
      results.push(result);
    }

    // Summary
    console.log('\n🎉 Seeding completed successfully!');
    console.log('\n📊 Summary:');
    console.log(`- Total Surveys: ${results.length}`);
    
    let totalQuestions = 0;
    let totalQuestionVersions = 0;
    let totalSurveyVersionQuestions = 0;
    
    results.forEach((result, index) => {
      const survey = result.survey;
      const surveyVersion = result.surveyVersion;
      totalQuestions += result.questions.length;
      totalQuestionVersions += result.questionVersions.length;
      totalSurveyVersionQuestions += result.surveyVersionQuestions.length;
      
      console.log(`\n📋 Survey ${index + 1}: ${survey.name}`);
      console.log(`  - Survey ID: ${survey.id}`);
      console.log(`  - Version: ${surveyVersion.name} (ID: ${surveyVersion.id})`);
      console.log(`  - Questions: ${result.questions.length}`);
      console.log(`  - Question Versions: ${result.questionVersions.length}`);
      console.log(`  - Survey Version Questions: ${result.surveyVersionQuestions.length}`);
    });

    console.log(`\n📈 Totals:`);
    console.log(`- Total Questions: ${totalQuestions}`);
    console.log(`- Total Question Versions: ${totalQuestionVersions}`);
    console.log(`- Total Survey Version Questions: ${totalSurveyVersionQuestions}`);

    console.log('\n🔗 You can now use these Survey Version IDs to create survey sessions and responses:');
    results.forEach((result, index) => {
      console.log(`  ${index + 1}. ${result.survey.name}: ${result.surveyVersion.id}`);
    });

  } catch (error) {
    console.error('❌ Seeding failed:', error);
    process.exit(1);
  } finally {
    if (AppDataSource.isInitialized) {
      await AppDataSource.destroy();
      console.log('\n📦 Database connection closed');
    }
  }
}

// Run the seeding function
seedData();
