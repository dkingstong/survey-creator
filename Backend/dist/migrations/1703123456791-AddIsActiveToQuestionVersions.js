"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddIsActiveToQuestionVersions1703123456791 = void 0;
class AddIsActiveToQuestionVersions1703123456791 {
    constructor() {
        this.name = 'AddIsActiveToQuestionVersions1703123456791';
    }
    async up(queryRunner) {
        await queryRunner.query(`
            ALTER TABLE "questions_versions" 
            ADD COLUMN "is_active" boolean NOT NULL DEFAULT true
        `);
    }
    async down(queryRunner) {
        await queryRunner.query(`
            ALTER TABLE "questions_versions" 
            DROP COLUMN "is_active"
        `);
    }
}
exports.AddIsActiveToQuestionVersions1703123456791 = AddIsActiveToQuestionVersions1703123456791;
//# sourceMappingURL=1703123456791-AddIsActiveToQuestionVersions.js.map