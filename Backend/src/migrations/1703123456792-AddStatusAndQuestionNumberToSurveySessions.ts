import { MigrationInterface, QueryRunner } from "typeorm";

export class AddStatusAndQuestionNumberToSurveySessions1703123456792 implements MigrationInterface {
    name = 'AddStatusAndQuestionNumberToSurveySessions1703123456792'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "survey_sessions" 
            ADD COLUMN "status" character varying(255) NOT NULL DEFAULT 'not_started'
        `);
        
        await queryRunner.query(`
            ALTER TABLE "survey_sessions" 
            ADD COLUMN "question_number" integer NOT NULL DEFAULT 0
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "survey_sessions" 
            DROP COLUMN "status"
        `);
        
        await queryRunner.query(`
            ALTER TABLE "survey_sessions" 
            DROP COLUMN "question_number"
        `);
    }
}
