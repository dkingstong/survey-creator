"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateAllTables1703123456789 = void 0;
class CreateAllTables1703123456789 {
    constructor() {
        this.name = 'CreateAllTables1703123456789';
    }
    async up(queryRunner) {
        await queryRunner.query(`
            CREATE TABLE "users" (
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "firstName" character varying(255) NOT NULL,
                "lastName" character varying(255) NOT NULL,
                "email" character varying(255) NOT NULL,
                "password" character varying(255) NOT NULL,
                "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
                "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
                CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"),
                CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            CREATE TABLE "surveys" (
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "name" character varying(255) NOT NULL,
                "description" character varying(255) NOT NULL,
                "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
                "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
                CONSTRAINT "PK_0b37a6d8c3d537f9fc6f907b7433" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            CREATE TABLE "survey_versions" (
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "name" character varying(255) NOT NULL,
                "description" character varying(255) NOT NULL,
                "version" character varying(255) NOT NULL,
                "survey_id" uuid NOT NULL,
                "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
                "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
                CONSTRAINT "PK_1a2b3c4d5e6f7g8h9i0j1k2l3m4n5o6p7" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            CREATE TYPE "public"."question_type_enum" AS ENUM('text', 'single_select', 'multi_select', 'rating', 'date', 'time', 'location')
        `);
        await queryRunner.query(`
            CREATE TABLE "questions" (
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "title" character varying(255) NOT NULL,
                "description" character varying(255) NOT NULL,
                "type" "public"."question_type_enum" NOT NULL,
                "metadata" jsonb NOT NULL,
                "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
                "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
                CONSTRAINT "PK_2a3b4c5d6e7f8g9h0i1j2k3l4m5n6o7p8" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            CREATE TABLE "questions_versions" (
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "title" character varying(255) NOT NULL,
                "description" character varying(255) NOT NULL,
                "type" "public"."question_type_enum" NOT NULL,
                "metadata" jsonb NOT NULL,
                "version" character varying(255) NOT NULL,
                "question_id" uuid NOT NULL,
                "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
                "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
                CONSTRAINT "PK_3a4b5c6d7e8f9g0h1i2j3k4l5m6n7o8p9" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            CREATE TABLE "options" (
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "value" character varying(255) NOT NULL,
                "label" character varying(255) NOT NULL,
                "question_version_id" uuid NOT NULL,
                "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
                "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
                CONSTRAINT "PK_4a5b6c7d8e9f0g1h2i3j4k5l6m7n8o9p0" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            CREATE TABLE "survey_sessions" (
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "name" character varying(255) NOT NULL,
                "user_id" uuid NOT NULL,
                "survey_version_id" uuid NOT NULL,
                "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
                "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
                CONSTRAINT "PK_5a6b7c8d9e0f1g2h3i4j5k6l7m8n9o0p1" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            CREATE TABLE "responses" (
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "value" jsonb NOT NULL,
                "survey_session_id" uuid NOT NULL,
                "question_version_id" uuid NOT NULL,
                "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
                "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
                CONSTRAINT "PK_6a7b8c9d0e1f2g3h4i5j6k7l8m9n0o1p2" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            CREATE TABLE "users_sessions" (
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "refresh_token" character varying(255) NOT NULL,
                "user_id" uuid NOT NULL,
                "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
                "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
                CONSTRAINT "PK_7a8b9c0d1e2f3g4h5i6j7k8l9m0n1o2p3" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            CREATE TABLE "survey_version_questions" (
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "order" integer NOT NULL,
                "survey_version_id" uuid NOT NULL,
                "question_version_id" uuid NOT NULL,
                "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
                "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
                CONSTRAINT "PK_8a9b0c1d2e3f4g5h6i7j8k9l0m1n2o3p4" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            ALTER TABLE "survey_versions" 
            ADD CONSTRAINT "FK_survey_versions_survey_id" 
            FOREIGN KEY ("survey_id") REFERENCES "surveys"("id") ON DELETE CASCADE ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "questions_versions" 
            ADD CONSTRAINT "FK_questions_versions_question_id" 
            FOREIGN KEY ("question_id") REFERENCES "questions"("id") ON DELETE CASCADE ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "options" 
            ADD CONSTRAINT "FK_options_question_version_id" 
            FOREIGN KEY ("question_version_id") REFERENCES "questions_versions"("id") ON DELETE CASCADE ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "survey_sessions" 
            ADD CONSTRAINT "FK_survey_sessions_user_id" 
            FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "survey_sessions" 
            ADD CONSTRAINT "FK_survey_sessions_survey_version_id" 
            FOREIGN KEY ("survey_version_id") REFERENCES "survey_versions"("id") ON DELETE CASCADE ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "responses" 
            ADD CONSTRAINT "FK_responses_survey_session_id" 
            FOREIGN KEY ("survey_session_id") REFERENCES "survey_sessions"("id") ON DELETE CASCADE ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "responses" 
            ADD CONSTRAINT "FK_responses_question_version_id" 
            FOREIGN KEY ("question_version_id") REFERENCES "questions_versions"("id") ON DELETE CASCADE ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "users_sessions" 
            ADD CONSTRAINT "FK_users_sessions_user_id" 
            FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "survey_version_questions" 
            ADD CONSTRAINT "FK_survey_version_questions_survey_version_id" 
            FOREIGN KEY ("survey_version_id") REFERENCES "survey_versions"("id") ON DELETE CASCADE ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "survey_version_questions" 
            ADD CONSTRAINT "FK_survey_version_questions_question_version_id" 
            FOREIGN KEY ("question_version_id") REFERENCES "questions_versions"("id") ON DELETE CASCADE ON UPDATE NO ACTION
        `);
        await queryRunner.query(`CREATE INDEX "IDX_users_email" ON "users" ("email")`);
        await queryRunner.query(`CREATE INDEX "IDX_surveys_name" ON "surveys" ("name")`);
        await queryRunner.query(`CREATE INDEX "IDX_survey_versions_survey_id" ON "survey_versions" ("survey_id")`);
        await queryRunner.query(`CREATE INDEX "IDX_questions_versions_question_id" ON "questions_versions" ("question_id")`);
        await queryRunner.query(`CREATE INDEX "IDX_options_question_version_id" ON "options" ("question_version_id")`);
        await queryRunner.query(`CREATE INDEX "IDX_survey_sessions_user_id" ON "survey_sessions" ("user_id")`);
        await queryRunner.query(`CREATE INDEX "IDX_survey_sessions_survey_version_id" ON "survey_sessions" ("survey_version_id")`);
        await queryRunner.query(`CREATE INDEX "IDX_responses_survey_session_id" ON "responses" ("survey_session_id")`);
        await queryRunner.query(`CREATE INDEX "IDX_responses_question_version_id" ON "responses" ("question_version_id")`);
        await queryRunner.query(`CREATE INDEX "IDX_users_sessions_user_id" ON "users_sessions" ("user_id")`);
        await queryRunner.query(`CREATE INDEX "IDX_users_sessions_refresh_token" ON "users_sessions" ("refresh_token")`);
        await queryRunner.query(`CREATE INDEX "IDX_survey_version_questions_survey_version_id" ON "survey_version_questions" ("survey_version_id")`);
        await queryRunner.query(`CREATE INDEX "IDX_survey_version_questions_question_version_id" ON "survey_version_questions" ("question_version_id")`);
        await queryRunner.query(`CREATE INDEX "IDX_survey_version_questions_order" ON "survey_version_questions" ("order")`);
    }
    async down(queryRunner) {
        await queryRunner.query(`DROP INDEX "IDX_survey_version_questions_order"`);
        await queryRunner.query(`DROP INDEX "IDX_survey_version_questions_question_version_id"`);
        await queryRunner.query(`DROP INDEX "IDX_survey_version_questions_survey_version_id"`);
        await queryRunner.query(`DROP INDEX "IDX_users_sessions_refresh_token"`);
        await queryRunner.query(`DROP INDEX "IDX_users_sessions_user_id"`);
        await queryRunner.query(`DROP INDEX "IDX_responses_question_version_id"`);
        await queryRunner.query(`DROP INDEX "IDX_responses_survey_session_id"`);
        await queryRunner.query(`DROP INDEX "IDX_survey_sessions_survey_version_id"`);
        await queryRunner.query(`DROP INDEX "IDX_survey_sessions_user_id"`);
        await queryRunner.query(`DROP INDEX "IDX_options_question_version_id"`);
        await queryRunner.query(`DROP INDEX "IDX_questions_versions_question_id"`);
        await queryRunner.query(`DROP INDEX "IDX_survey_versions_survey_id"`);
        await queryRunner.query(`DROP INDEX "IDX_surveys_name"`);
        await queryRunner.query(`DROP INDEX "IDX_users_email"`);
        await queryRunner.query(`ALTER TABLE "survey_version_questions" DROP CONSTRAINT "FK_survey_version_questions_question_version_id"`);
        await queryRunner.query(`ALTER TABLE "survey_version_questions" DROP CONSTRAINT "FK_survey_version_questions_survey_version_id"`);
        await queryRunner.query(`ALTER TABLE "users_sessions" DROP CONSTRAINT "FK_users_sessions_user_id"`);
        await queryRunner.query(`ALTER TABLE "responses" DROP CONSTRAINT "FK_responses_question_version_id"`);
        await queryRunner.query(`ALTER TABLE "responses" DROP CONSTRAINT "FK_responses_survey_session_id"`);
        await queryRunner.query(`ALTER TABLE "survey_sessions" DROP CONSTRAINT "FK_survey_sessions_survey_version_id"`);
        await queryRunner.query(`ALTER TABLE "survey_sessions" DROP CONSTRAINT "FK_survey_sessions_user_id"`);
        await queryRunner.query(`ALTER TABLE "options" DROP CONSTRAINT "FK_options_question_version_id"`);
        await queryRunner.query(`ALTER TABLE "questions_versions" DROP CONSTRAINT "FK_questions_versions_question_id"`);
        await queryRunner.query(`ALTER TABLE "survey_versions" DROP CONSTRAINT "FK_survey_versions_survey_id"`);
        await queryRunner.query(`DROP TABLE "survey_version_questions"`);
        await queryRunner.query(`DROP TABLE "users_sessions"`);
        await queryRunner.query(`DROP TABLE "responses"`);
        await queryRunner.query(`DROP TABLE "survey_sessions"`);
        await queryRunner.query(`DROP TABLE "options"`);
        await queryRunner.query(`DROP TABLE "questions_versions"`);
        await queryRunner.query(`DROP TABLE "questions"`);
        await queryRunner.query(`DROP TYPE "public"."question_type_enum"`);
        await queryRunner.query(`DROP TABLE "survey_versions"`);
        await queryRunner.query(`DROP TABLE "surveys"`);
        await queryRunner.query(`DROP TABLE "users"`);
    }
}
exports.CreateAllTables1703123456789 = CreateAllTables1703123456789;
//# sourceMappingURL=1703123456789-CreateAllTables.js.map