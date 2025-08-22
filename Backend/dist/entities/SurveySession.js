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
exports.SurveySession = void 0;
const typeorm_1 = require("typeorm");
const User_1 = require("./User");
const SurveyVersion_1 = require("./SurveyVersion");
let SurveySession = class SurveySession {
};
exports.SurveySession = SurveySession;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], SurveySession.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 255 }),
    __metadata("design:type", String)
], SurveySession.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => User_1.User, (user) => user.id),
    (0, typeorm_1.JoinColumn)({ name: 'user_id' }),
    __metadata("design:type", User_1.User)
], SurveySession.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => SurveyVersion_1.SurveyVersion, (surveyVersion) => surveyVersion.id),
    (0, typeorm_1.JoinColumn)({ name: 'survey_version_id' }),
    __metadata("design:type", SurveyVersion_1.SurveyVersion)
], SurveySession.prototype, "surveyVersion", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 255 }),
    __metadata("design:type", String)
], SurveySession.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'integer', default: 0 }),
    __metadata("design:type", Number)
], SurveySession.prototype, "question_number", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ type: 'timestamp with time zone' }),
    __metadata("design:type", Date)
], SurveySession.prototype, "created_at", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ type: 'timestamp with time zone' }),
    __metadata("design:type", Date)
], SurveySession.prototype, "updated_at", void 0);
exports.SurveySession = SurveySession = __decorate([
    (0, typeorm_1.Entity)('survey_sessions')
], SurveySession);
//# sourceMappingURL=SurveySession.js.map