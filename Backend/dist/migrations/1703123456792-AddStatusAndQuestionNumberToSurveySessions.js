"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddStatusAndQuestionNumberToSurveySessions1703123456792 = void 0;
class AddStatusAndQuestionNumberToSurveySessions1703123456792 {
    constructor() {
        this.name = 'AddStatusAndQuestionNumberToSurveySessions1703123456792';
    }
    async up(queryRunner) {
        await queryRunner.query(`
            ALTER TABLE "survey_sessions" 
            ADD COLUMN "status" character varying(255) NOT NULL DEFAULT 'not_started'
        `);
        await queryRunner.query(`
            ALTER TABLE "survey_sessions" 
            ADD COLUMN "question_number" integer NOT NULL DEFAULT 0
        `);
    }
    async down(queryRunner) {
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
exports.AddStatusAndQuestionNumberToSurveySessions1703123456792 = AddStatusAndQuestionNumberToSurveySessions1703123456792;
//# sourceMappingURL=1703123456792-AddStatusAndQuestionNumberToSurveySessions.js.map