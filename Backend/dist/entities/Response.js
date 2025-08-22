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
exports.Response = void 0;
const typeorm_1 = require("typeorm");
const SurveySession_1 = require("./SurveySession");
const QuestionVersion_1 = require("./QuestionVersion");
let Response = class Response {
};
exports.Response = Response;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], Response.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => SurveySession_1.SurveySession, (surveySession) => surveySession.id),
    (0, typeorm_1.JoinColumn)({ name: 'survey_session_id' }),
    __metadata("design:type", SurveySession_1.SurveySession)
], Response.prototype, "surveySession", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => QuestionVersion_1.QuestionVersion, (questionVersion) => questionVersion.id),
    (0, typeorm_1.JoinColumn)({ name: 'question_version_id' }),
    __metadata("design:type", QuestionVersion_1.QuestionVersion)
], Response.prototype, "questionVersion", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'jsonb' }),
    __metadata("design:type", Object)
], Response.prototype, "value", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ type: 'timestamp with time zone' }),
    __metadata("design:type", Date)
], Response.prototype, "created_at", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ type: 'timestamp with time zone' }),
    __metadata("design:type", Date)
], Response.prototype, "updated_at", void 0);
exports.Response = Response = __decorate([
    (0, typeorm_1.Entity)('responses')
], Response);
//# sourceMappingURL=Response.js.map