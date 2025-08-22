# Database Migrations

This document explains how to use the TypeORM migration system in this project.

## Overview

Migrations are used to manage database schema changes in a version-controlled way. They allow you to:
- Track database schema changes
- Roll back changes if needed
- Deploy schema changes safely
- Maintain consistency across environments

## Migration Commands

### Generate a New Migration
```bash
npm run migration:generate -- src/migrations/MigrationName
```

This will:
- Compare your current entities with the database
- Generate a migration file with the differences
- Place it in `src/migrations/` with a timestamp

### Run Migrations
```bash
npm run migration:run
```

This will:
- Run all pending migrations
- Update the database schema
- Mark migrations as executed

### Revert Last Migration
```bash
npm run migration:revert
```

This will:
- Revert the last executed migration
- Roll back the database schema changes

## Migration Files

### Structure
Each migration file contains:
- `up()` method - Applies the migration
- `down()` method - Reverts the migration
- Timestamp prefix for ordering

### Example Migration
```typescript
import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateUsersTable1703123456789 implements MigrationInterface {
    name = 'CreateUsersTable1703123456789'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE "users" (
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "firstName" character varying(255) NOT NULL,
                "lastName" character varying(255) NOT NULL,
                "email" character varying(255) NOT NULL,
                "password" character varying(255) NOT NULL,
                "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
                "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
                CONSTRAINT "UQ_email" UNIQUE ("email"),
                CONSTRAINT "PK_users" PRIMARY KEY ("id")
            )
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "users"`);
    }
}
```

## Current Migrations

### 1. CreateInitialTables (1703123456789)
Creates all initial tables and relationships:

**Tables Created:**
- `users` - User accounts
- `surveys` - Survey definitions
- `survey_versions` - Survey versions
- `questions` - Question definitions
- `questions_versions` - Question versions
- `options` - Question options
- `survey_sessions` - User survey sessions
- `responses` - User responses
- `users_sessions` - Authentication sessions
- `survey_version_questions` - Survey-question relationships

**Relationships:**
- Survey Versions → Surveys (Many-to-One)
- Question Versions → Questions (Many-to-One)
- Options → Question Versions (Many-to-One)
- Survey Sessions → Users (Many-to-One)
- Survey Sessions → Survey Versions (Many-to-One)
- Responses → Survey Sessions (Many-to-One)
- Responses → Question Versions (Many-to-One)
- User Sessions → Users (Many-to-One)
- Survey Version Questions → Survey Versions (Many-to-One)
- Survey Version Questions → Question Versions (Many-to-One)

**Indexes Created:**
- Email uniqueness on users
- Survey name index
- Foreign key indexes for performance
- Order index for survey questions

## Best Practices

### 1. Always Test Migrations
```bash
# Test on development database first
npm run migration:run

# Verify the changes
npm run migration:revert
npm run migration:run
```

### 2. Keep Migrations Small
- One logical change per migration
- Easier to review and debug
- Safer to rollback

### 3. Use Descriptive Names
```bash
# Good
npm run migration:generate -- src/migrations/AddUserProfileFields

# Bad
npm run migration:generate -- src/migrations/Update123
```

### 4. Always Include Down Method
- Enables rollback functionality
- Required for safe deployments
- Helps with testing

### 5. Use Transactions
Migrations run in transactions by default, ensuring atomicity.

## Production Deployment

### 1. Backup Database
```bash
pg_dump your_database > backup.sql
```

### 2. Run Migrations
```bash
npm run migration:run
```

### 3. Verify Changes
Check that all tables and relationships are correct.

### 4. Monitor Application
Ensure the application works correctly with the new schema.

## Troubleshooting

### Migration Fails
1. Check the error message
2. Verify database connection
3. Ensure no conflicting changes
4. Check for syntax errors in migration

### Rollback Issues
1. Verify the down() method is correct
2. Check for data dependencies
3. Ensure no foreign key constraints prevent rollback

### Performance Issues
1. Add indexes for frequently queried columns
2. Consider breaking large migrations into smaller ones
3. Run migrations during low-traffic periods

## Environment-Specific Notes

### Development
- `synchronize: true` in TypeORM config
- Auto-generates schema from entities
- Useful for rapid development

### Production
- `synchronize: false` in TypeORM config
- Use migrations for all schema changes
- Ensures safe and controlled deployments

## Migration History

The migration system tracks executed migrations in a `migrations` table:
- `id` - Migration identifier
- `timestamp` - When it was executed
- `name` - Migration name

This prevents running the same migration twice and enables rollback functionality.
