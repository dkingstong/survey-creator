import { MigrationInterface, QueryRunner } from "typeorm";

export class AddIsActiveToSurveyVersions1703123456790 implements MigrationInterface {
    name = 'AddIsActiveToSurveyVersions1703123456790'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "survey_versions" 
            ADD COLUMN "is_active" boolean NOT NULL DEFAULT true
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "survey_versions" 
            DROP COLUMN "is_active"
        `);
    }
}
