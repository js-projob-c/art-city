import { MigrationInterface, QueryRunner } from 'typeorm';

export class Init1711111574514 implements MigrationInterface {
  name = 'Init1711111574514';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TYPE "art-city"."leave_status_enum" AS ENUM('PENDING', 'APPROVED', 'REJECTED')`,
    );
    await queryRunner.query(
      `CREATE TABLE "art-city"."leave" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "from" TIMESTAMP NOT NULL, "to" TIMESTAMP NOT NULL, "days" smallint NOT NULL, "status" "art-city"."leave_status_enum" NOT NULL, "applyReason" character varying NOT NULL, "approvedBy" character varying, "rejectedBy" character varying, "approvedAt" TIMESTAMP, "rejectedAt" TIMESTAMP, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "userId" uuid, CONSTRAINT "PK_501f6ea368365d2a40b1660e16b" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TYPE "art-city"."task_visibleto_enum" AS ENUM('INVISIBLE', 'DEPARTMENT', 'ASSIGNEE')`,
    );
    await queryRunner.query(
      `CREATE TYPE "art-city"."task_status_enum" AS ENUM('PENDING', 'IN_PROGRESS', 'COMPLETED')`,
    );
    await queryRunner.query(
      `CREATE TABLE "art-city"."task" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "title" character varying NOT NULL, "description" character varying NOT NULL, "visibleTo" "art-city"."task_visibleto_enum" NOT NULL, "status" "art-city"."task_status_enum" NOT NULL, "progress" smallint NOT NULL DEFAULT '0', "completedAt" TIMESTAMP NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "projectId" uuid, CONSTRAINT "PK_fb213f79ee45060ba925ecd576e" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "art-city"."project" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "title" character varying NOT NULL, "description" character varying NOT NULL, "completedAt" TIMESTAMP NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "ownerId" uuid, CONSTRAINT "PK_4d68b1358bb5b766d3e78f32f57" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TYPE "art-city"."reimburse_type_enum" AS ENUM('TRAVEL', 'FOOD', 'OTHERS')`,
    );
    await queryRunner.query(
      `CREATE TYPE "art-city"."reimburse_status_enum" AS ENUM('PENDING', 'APPROVED', 'REJECTED')`,
    );
    await queryRunner.query(
      `CREATE TABLE "art-city"."reimburse" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "date" date NOT NULL, "amount" numeric NOT NULL, "description" character varying NOT NULL, "type" "art-city"."reimburse_type_enum" NOT NULL, "status" "art-city"."reimburse_status_enum" NOT NULL, "supportDocument" character varying, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "userId" uuid, CONSTRAINT "PK_80e667999362114b4fdb32c9dcd" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "art-city"."user-detail" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "monthlySalary" numeric NOT NULL, "annualLeave" smallint NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "userId" uuid, CONSTRAINT "REL_2849b7f1b25e06aac538631328" UNIQUE ("userId"), CONSTRAINT "PK_b6d0b55eec4a0114ee973d7b020" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TYPE "art-city"."user_role_enum" AS ENUM('GUEST', 'ADMIN', 'MANAGER', 'EMPLOYEE')`,
    );
    await queryRunner.query(
      `CREATE TYPE "art-city"."user_department_enum" AS ENUM('ADMIN', 'SALES', 'CS', 'HR')`,
    );
    await queryRunner.query(
      `CREATE TABLE "art-city"."user" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "email" text NOT NULL, "password" text NOT NULL, "firstName" text NOT NULL, "lastName" text NOT NULL, "role" "art-city"."user_role_enum" NOT NULL, "department" "art-city"."user_department_enum" NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "art-city"."attendance" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "signInAt" TIMESTAMP NOT NULL, "signOutAt" TIMESTAMP, "workHourFrom" TIMESTAMP NOT NULL, "workHourTo" TIMESTAMP NOT NULL, "supportDocument" character varying, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "userId" uuid, CONSTRAINT "PK_ee0ffe42c1f1a01e72b725c0cb2" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "art-city"."bank" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "bank" character varying NOT NULL, "account" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_7651eaf705126155142947926e8" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TYPE "art-city"."customer_source_enum" AS ENUM('FACEBOOK', 'IG', 'TV', 'PHONE', 'OTHER')`,
    );
    await queryRunner.query(
      `CREATE TYPE "art-city"."customer_type_enum" AS ENUM('FACEBOOK', 'IG', 'TV', 'PHONE', 'OTHER')`,
    );
    await queryRunner.query(
      `CREATE TABLE "art-city"."customer" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "firstName" character varying NOT NULL, "lastName" character varying NOT NULL, "phone" character varying NOT NULL, "email" character varying NOT NULL, "source" "art-city"."customer_source_enum" NOT NULL, "type" "art-city"."customer_type_enum" NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_a7a13f4cacb744524e44dfdad32" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "art-city"."purchase-counterpart" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "company" character varying NOT NULL, "contactPerson" character varying NOT NULL, "email" character varying NOT NULL, "phone" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_2c5da34a587293b0f83a711ccd7" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TYPE "art-city"."purchase_status_enum" AS ENUM('PENDING', 'PAID', 'RECEIVED', 'CANCELED')`,
    );
    await queryRunner.query(
      `CREATE TABLE "art-city"."purchase" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "description" character varying NOT NULL, "items" jsonb NOT NULL, "status" "art-city"."purchase_status_enum" NOT NULL, "amount" numeric NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "counterpartId" uuid, CONSTRAINT "REL_a5047236e53f06b2338d3df653" UNIQUE ("counterpartId"), CONSTRAINT "PK_86cc2ebeb9e17fc9c0774b05f69" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "art-city"."system" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "workHourFrom" TIMESTAMP NOT NULL, "workHourTo" TIMESTAMP NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_6b1e6b6f88da9888fde62379945" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "art-city"."user_tasks_task" ("userId" uuid NOT NULL, "taskId" uuid NOT NULL, CONSTRAINT "PK_5c112b153701f554843915f643f" PRIMARY KEY ("userId", "taskId"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_1fb6a986133f8f6cafb3d4fb31" ON "art-city"."user_tasks_task" ("userId") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_9bcb8e9773d79c9874a61f79c3" ON "art-city"."user_tasks_task" ("taskId") `,
    );
    await queryRunner.query(
      `ALTER TABLE "art-city"."leave" ADD CONSTRAINT "FK_9fb20081bf48840a16e0d33d14e" FOREIGN KEY ("userId") REFERENCES "art-city"."user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "art-city"."task" ADD CONSTRAINT "FK_3797a20ef5553ae87af126bc2fe" FOREIGN KEY ("projectId") REFERENCES "art-city"."project"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "art-city"."project" ADD CONSTRAINT "FK_9884b2ee80eb70b7db4f12e8aed" FOREIGN KEY ("ownerId") REFERENCES "art-city"."user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "art-city"."reimburse" ADD CONSTRAINT "FK_8b224c1be1ba2c8c51dd3022ccb" FOREIGN KEY ("userId") REFERENCES "art-city"."user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "art-city"."user-detail" ADD CONSTRAINT "FK_2849b7f1b25e06aac5386313280" FOREIGN KEY ("userId") REFERENCES "art-city"."user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "art-city"."attendance" ADD CONSTRAINT "FK_466e85b813d871bfb693f443528" FOREIGN KEY ("userId") REFERENCES "art-city"."user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "art-city"."purchase" ADD CONSTRAINT "FK_a5047236e53f06b2338d3df6534" FOREIGN KEY ("counterpartId") REFERENCES "art-city"."purchase-counterpart"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "art-city"."user_tasks_task" ADD CONSTRAINT "FK_1fb6a986133f8f6cafb3d4fb31e" FOREIGN KEY ("userId") REFERENCES "art-city"."user"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "art-city"."user_tasks_task" ADD CONSTRAINT "FK_9bcb8e9773d79c9874a61f79c3d" FOREIGN KEY ("taskId") REFERENCES "art-city"."task"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "art-city"."user_tasks_task" DROP CONSTRAINT "FK_9bcb8e9773d79c9874a61f79c3d"`,
    );
    await queryRunner.query(
      `ALTER TABLE "art-city"."user_tasks_task" DROP CONSTRAINT "FK_1fb6a986133f8f6cafb3d4fb31e"`,
    );
    await queryRunner.query(
      `ALTER TABLE "art-city"."purchase" DROP CONSTRAINT "FK_a5047236e53f06b2338d3df6534"`,
    );
    await queryRunner.query(
      `ALTER TABLE "art-city"."attendance" DROP CONSTRAINT "FK_466e85b813d871bfb693f443528"`,
    );
    await queryRunner.query(
      `ALTER TABLE "art-city"."user-detail" DROP CONSTRAINT "FK_2849b7f1b25e06aac5386313280"`,
    );
    await queryRunner.query(
      `ALTER TABLE "art-city"."reimburse" DROP CONSTRAINT "FK_8b224c1be1ba2c8c51dd3022ccb"`,
    );
    await queryRunner.query(
      `ALTER TABLE "art-city"."project" DROP CONSTRAINT "FK_9884b2ee80eb70b7db4f12e8aed"`,
    );
    await queryRunner.query(
      `ALTER TABLE "art-city"."task" DROP CONSTRAINT "FK_3797a20ef5553ae87af126bc2fe"`,
    );
    await queryRunner.query(
      `ALTER TABLE "art-city"."leave" DROP CONSTRAINT "FK_9fb20081bf48840a16e0d33d14e"`,
    );
    await queryRunner.query(
      `DROP INDEX "art-city"."IDX_9bcb8e9773d79c9874a61f79c3"`,
    );
    await queryRunner.query(
      `DROP INDEX "art-city"."IDX_1fb6a986133f8f6cafb3d4fb31"`,
    );
    await queryRunner.query(`DROP TABLE "art-city"."user_tasks_task"`);
    await queryRunner.query(`DROP TABLE "art-city"."system"`);
    await queryRunner.query(`DROP TABLE "art-city"."purchase"`);
    await queryRunner.query(`DROP TYPE "art-city"."purchase_status_enum"`);
    await queryRunner.query(`DROP TABLE "art-city"."purchase-counterpart"`);
    await queryRunner.query(`DROP TABLE "art-city"."customer"`);
    await queryRunner.query(`DROP TYPE "art-city"."customer_type_enum"`);
    await queryRunner.query(`DROP TYPE "art-city"."customer_source_enum"`);
    await queryRunner.query(`DROP TABLE "art-city"."bank"`);
    await queryRunner.query(`DROP TABLE "art-city"."attendance"`);
    await queryRunner.query(`DROP TABLE "art-city"."user"`);
    await queryRunner.query(`DROP TYPE "art-city"."user_department_enum"`);
    await queryRunner.query(`DROP TYPE "art-city"."user_role_enum"`);
    await queryRunner.query(`DROP TABLE "art-city"."user-detail"`);
    await queryRunner.query(`DROP TABLE "art-city"."reimburse"`);
    await queryRunner.query(`DROP TYPE "art-city"."reimburse_status_enum"`);
    await queryRunner.query(`DROP TYPE "art-city"."reimburse_type_enum"`);
    await queryRunner.query(`DROP TABLE "art-city"."project"`);
    await queryRunner.query(`DROP TABLE "art-city"."task"`);
    await queryRunner.query(`DROP TYPE "art-city"."task_status_enum"`);
    await queryRunner.query(`DROP TYPE "art-city"."task_visibleto_enum"`);
    await queryRunner.query(`DROP TABLE "art-city"."leave"`);
    await queryRunner.query(`DROP TYPE "art-city"."leave_status_enum"`);
  }
}
