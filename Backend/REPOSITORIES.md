# Repository Documentation

This document describes all the repositories available in the application with their CRUD operations and usage examples.

## Overview

All repositories follow the same pattern and provide:
- **CRUD Operations**: Create, Read, Update, Delete
- **Type Safety**: Full TypeScript support
- **Relations**: Automatic loading of related entities
- **Validation**: Built-in uniqueness checks
- **Query Building**: Advanced query capabilities

## Available Repositories

### 1. UserRepository
Manages user accounts and authentication.

```typescript
import { UserRepository } from '../repositories';

const userRepo = new UserRepository();

// Create user
const user = await userRepo.create({
  firstName: 'John',
  lastName: 'Doe',
  email: 'john@example.com',
  password: 'password123'
});

// Find by email
const user = await userRepo.findByEmail('john@example.com');

// Check email uniqueness
const exists = await userRepo.emailExists('john@example.com');
```

### 2. SurveyRepository
Manages survey definitions.

```typescript
import { SurveyRepository } from '../repositories';

const surveyRepo = new SurveyRepository();

// Create survey
const survey = await surveyRepo.create({
  name: 'Customer Satisfaction',
  description: 'Survey to measure customer satisfaction'
});

// Find by name
const survey = await surveyRepo.findByName('Customer Satisfaction');

// Check name uniqueness
const exists = await surveyRepo.nameExists('Customer Satisfaction');
```

### 3. SurveyVersionRepository
Manages different versions of surveys.

```typescript
import { SurveyVersionRepository } from '../repositories';

const versionRepo = new SurveyVersionRepository();

// Create version
const version = await versionRepo.create({
  name: 'v1.0',
  description: 'Initial version',
  version: '1.0.0',
  survey: { id: surveyId }
});

// Find versions by survey
const versions = await versionRepo.findBySurveyId(surveyId);

// Check version uniqueness
const exists = await versionRepo.versionExists('1.0.0', surveyId);
```

### 4. QuestionRepository
Manages question definitions.

```typescript
import { QuestionRepository, QuestionType } from '../repositories';

const questionRepo = new QuestionRepository();

// Create question
const question = await questionRepo.create({
  title: 'How satisfied are you?',
  description: 'Rate your satisfaction level',
  type: QuestionType.RATING,
  metadata: { min: 1, max: 5 }
});

// Find by type
const ratingQuestions = await questionRepo.findByType(QuestionType.RATING);

// Check title uniqueness
const exists = await questionRepo.titleExists('How satisfied are you?');
```

### 5. QuestionVersionRepository
Manages different versions of questions.

```typescript
import { QuestionVersionRepository } from '../repositories';

const qvRepo = new QuestionVersionRepository();

// Create question version
const qVersion = await qvRepo.create({
  title: 'How satisfied are you?',
  description: 'Rate your satisfaction level',
  type: QuestionType.RATING,
  version: '1.0.0',
  question: { id: questionId },
  metadata: { min: 1, max: 5 }
});

// Find versions by question
const versions = await qvRepo.findByQuestionId(questionId);

// Check version uniqueness
const exists = await qvRepo.versionExists('1.0.0', questionId);
```

### 6. OptionRepository
Manages options for select-type questions.

```typescript
import { OptionRepository } from '../repositories';

const optionRepo = new OptionRepository();

// Create option
const option = await optionRepo.create({
  value: 'very_satisfied',
  label: 'Very Satisfied',
  questionVersion: { id: questionVersionId }
});

// Find options by question version
const options = await optionRepo.findByQuestionVersionId(questionVersionId);

// Check value uniqueness
const exists = await optionRepo.valueExists('very_satisfied', questionVersionId);

// Delete all options for a question version
await optionRepo.deleteByQuestionVersionId(questionVersionId);
```

### 7. SurveySessionRepository
Manages user survey sessions.

```typescript
import { SurveySessionRepository } from '../repositories';

const sessionRepo = new SurveySessionRepository();

// Create session
const session = await sessionRepo.create({
  name: 'Session 1',
  user: { id: userId },
  surveyVersion: { id: surveyVersionId }
});

// Find sessions by user
const userSessions = await sessionRepo.findByUserId(userId);

// Find sessions by survey
const surveySessions = await sessionRepo.findBySurveyId(surveyId);

// Check name uniqueness for user
const exists = await sessionRepo.nameExists('Session 1', userId);
```

### 8. ResponseRepository
Manages user responses to questions.

```typescript
import { ResponseRepository } from '../repositories';

const responseRepo = new ResponseRepository();

// Create response
const response = await responseRepo.create({
  surveySession: { id: sessionId },
  questionVersion: { id: questionVersionId },
  value: { answer: 'very_satisfied' }
});

// Find responses by session
const sessionResponses = await responseRepo.findBySurveySessionId(sessionId);

// Find responses by user
const userResponses = await responseRepo.findByUserId(userId);

// Find specific response
const response = await responseRepo.findBySurveySessionAndQuestion(sessionId, questionVersionId);
```

### 9. UserSessionRepository
Manages user authentication sessions.

```typescript
import { UserSessionRepository } from '../repositories';

const userSessionRepo = new UserSessionRepository();

// Create session
const session = await userSessionRepo.create({
  refresh_token: 'token123',
  user: { id: userId }
});

// Find by refresh token
const session = await userSessionRepo.findByRefreshToken('token123');

// Find sessions by user
const userSessions = await userSessionRepo.findByUserId(userId);

// Clean up expired sessions
const deletedCount = await userSessionRepo.cleanupExpiredSessions(30); // 30 days old
```

### 10. SurveyVersionQuestionRepository
Manages the relationship between survey versions and questions.

```typescript
import { SurveyVersionQuestionRepository } from '../repositories';

const svqRepo = new SurveyVersionQuestionRepository();

// Create relationship
const svq = await svqRepo.create({
  surveyVersion: { id: surveyVersionId },
  questionVersion: { id: questionVersionId },
  order: 1
});

// Find questions by survey version
const questions = await svqRepo.findBySurveyVersionId(surveyVersionId);

// Reorder questions
await svqRepo.reorderQuestions(surveyVersionId, [
  { id: 'q1', order: 1 },
  { id: 'q2', order: 2 }
]);

// Get next order number
const nextOrder = await svqRepo.getNextOrder(surveyVersionId);
```

## Common Patterns

### Error Handling
```typescript
try {
  const result = await repository.create(data);
  return result;
} catch (error) {
  console.error('Repository error:', error);
  throw new Error('Failed to create record');
}
```

### Validation
```typescript
// Check uniqueness before creating
const exists = await repository.emailExists(email);
if (exists) {
  throw new Error('Email already exists');
}

const result = await repository.create(data);
```

### Relations
```typescript
// Load with relations
const result = await repository.findById(id, {
  relations: ['user', 'survey']
});

// Or use the built-in relation loading
const result = await repository.findById(id); // Relations loaded automatically
```

## Best Practices

1. **Always handle errors** when using repositories
2. **Validate uniqueness** before creating records
3. **Use relations** to load related data efficiently
4. **Clean up related data** when deleting parent records
5. **Use transactions** for complex operations involving multiple repositories

## Transaction Example
```typescript
import { AppDataSource } from '../config/database';

const queryRunner = AppDataSource.createQueryRunner();
await queryRunner.connect();
await queryRunner.startTransaction();

try {
  const surveyRepo = new SurveyRepository();
  const versionRepo = new SurveyVersionRepository();

  const survey = await surveyRepo.create(surveyData);
  const version = await versionRepo.create({
    ...versionData,
    survey: { id: survey.id }
  });

  await queryRunner.commitTransaction();
  return { survey, version };
} catch (error) {
  await queryRunner.rollbackTransaction();
  throw error;
} finally {
  await queryRunner.release();
}
```
