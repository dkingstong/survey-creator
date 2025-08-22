import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateSurveySessionStatusDefault1755877061041 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        // Update the default value for the status column from 'not_started' to 'in_progress'
        await queryRunner.query(`
            ALTER TABLE "survey_sessions" 
            ALTER COLUMN "status" SET DEFAULT 'in_progress'
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // Revert the default value back to 'not_started'
        await queryRunner.query(`
            ALTER TABLE "survey_sessions" 
            ALTER COLUMN "status" SET DEFAULT 'not_started'
        `);
    }

}
