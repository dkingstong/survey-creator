import { MigrationInterface, QueryRunner } from "typeorm";

export class AddIsActiveToQuestionVersions1703123456791 implements MigrationInterface {
    name = 'AddIsActiveToQuestionVersions1703123456791'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "questions_versions" 
            ADD COLUMN "is_active" boolean NOT NULL DEFAULT true
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "questions_versions" 
            DROP COLUMN "is_active"
        `);
    }
}
