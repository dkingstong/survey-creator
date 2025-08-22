"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SurveyVersionQuestion = void 0;
const typeorm_1 = require("typeorm");
const SurveyVersion_1 = require("./SurveyVersion");
const QuestionVersion_1 = require("./QuestionVersion");
let SurveyVersionQuestion = class SurveyVersionQuestion {
};
exports.SurveyVersionQuestion = SurveyVersionQuestion;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], SurveyVersionQuestion.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => SurveyVersion_1.SurveyVersion, (surveyVersion) => surveyVersion.id),
    (0, typeorm_1.JoinColumn)({ name: 'survey_version_id' }),
    __metadata("design:type", SurveyVersion_1.SurveyVersion)
], SurveyVersionQuestion.prototype, "surveyVersion", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => QuestionVersion_1.QuestionVersion, (questionVersion) => questionVersion.id),
    (0, typeorm_1.JoinColumn)({ name: 'question_version_id' }),
    __metadata("design:type", QuestionVersion_1.QuestionVersion)
], SurveyVersionQuestion.prototype, "questionVersion", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'integer' }),
    __metadata("design:type", Number)
], SurveyVersionQuestion.prototype, "order", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ type: 'timestamp with time zone' }),
    __metadata("design:type", Date)
], SurveyVersionQuestion.prototype, "created_at", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ type: 'timestamp with time zone' }),
    __metadata("design:type", Date)
], SurveyVersionQuestion.prototype, "updated_at", void 0);
exports.SurveyVersionQuestion = SurveyVersionQuestion = __decorate([
    (0, typeorm_1.Entity)('survey_version_questions')
], SurveyVersionQuestion);
//# sourceMappingURL=SurveyVersionQuestion.js.map