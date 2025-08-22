"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddIsActiveToSurveyVersions1703123456790 = void 0;
class AddIsActiveToSurveyVersions1703123456790 {
    constructor() {
        this.name = 'AddIsActiveToSurveyVersions1703123456790';
    }
    async up(queryRunner) {
        await queryRunner.query(`
            ALTER TABLE "survey_versions" 
            ADD COLUMN "is_active" boolean NOT NULL DEFAULT true
        `);
    }
    async down(queryRunner) {
        await queryRunner.query(`
            ALTER TABLE "survey_versions" 
            DROP COLUMN "is_active"
        `);
    }
}
exports.AddIsActiveToSurveyVersions1703123456790 = AddIsActiveToSurveyVersions1703123456790;
//# sourceMappingURL=1703123456790-AddIsActiveToSurveyVersions.js.map