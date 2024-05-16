import { MigrationInterface, QueryRunner } from 'typeorm';

export class Init1715616361402 implements MigrationInterface {
  name = 'Init1715616361402';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TYPE "art_city"."customer_source_enum" AS ENUM('FACEBOOK', 'IG', 'TV', 'PHONE', 'OTHER')`,
    );
    await queryRunner.query(
      `CREATE TYPE "art_city"."customer_type_enum" AS ENUM('FACEBOOK', 'IG', 'TV', 'PHONE', 'OTHER')`,
    );
    await queryRunner.query(
      `CREATE TABLE "art_city"."customer" ("createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "firstName" character varying NOT NULL, "lastName" character varying NOT NULL, "phone" character varying NOT NULL, "email" character varying NOT NULL, "source" "art_city"."customer_source_enum" NOT NULL, "type" "art_city"."customer_type_enum" NOT NULL, CONSTRAINT "PK_a7a13f4cacb744524e44dfdad32" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TYPE "art_city"."leave_status_enum" AS ENUM('PENDING', 'APPROVED', 'REJECTED', 'CANCELLED')`,
    );
    await queryRunner.query(
      `CREATE TYPE "art_city"."leave_type_enum" AS ENUM('ANNUAL', 'SICK', 'OTHERS')`,
    );
    await queryRunner.query(
      `CREATE TABLE "art_city"."leave" ("createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "from" date NOT NULL, "fromDayType" character varying NOT NULL, "to" date NOT NULL, "toDayType" character varying NOT NULL, "days" smallint NOT NULL, "status" "art_city"."leave_status_enum" NOT NULL, "type" "art_city"."leave_type_enum" NOT NULL, "reason" character varying NOT NULL, "reviewedAt" TIMESTAMP, "userId" uuid, "reviewerId" uuid, CONSTRAINT "REL_34e0276fce1403a75ac8662e13" UNIQUE ("reviewerId"), CONSTRAINT "PK_501f6ea368365d2a40b1660e16b" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TYPE "art_city"."payroll_type_enum" AS ENUM('BASE_SALARY', 'BONUS', 'REIMBURSE')`,
    );
    await queryRunner.query(
      `CREATE TABLE "art_city"."payroll" ("createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "amount" numeric NOT NULL, "paidAt" TIMESTAMP NOT NULL, "type" "art_city"."payroll_type_enum" NOT NULL, "userId" uuid, CONSTRAINT "PK_7a76b819506029fc535b6e002e0" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TYPE "art_city"."task_visibleto_enum" AS ENUM('INVISIBLE', 'DEPARTMENT', 'ASSIGNEE')`,
    );
    await queryRunner.query(
      `CREATE TYPE "art_city"."task_status_enum" AS ENUM('PENDING', 'IN_PROGRESS', 'COMPLETED', 'ABANDONED')`,
    );
    await queryRunner.query(
      `CREATE TABLE "art_city"."task" ("createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "description" character varying NOT NULL, "visibleTo" "art_city"."task_visibleto_enum" NOT NULL, "status" "art_city"."task_status_enum" NOT NULL, "progress" smallint NOT NULL DEFAULT '0', "completedAt" TIMESTAMP NOT NULL, "projectId" uuid, CONSTRAINT "PK_fb213f79ee45060ba925ecd576e" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TYPE "art_city"."project_status_enum" AS ENUM('PENDING', 'IN_PROGRESS', 'COMPLETED', 'ABANDONED')`,
    );
    await queryRunner.query(
      `CREATE TABLE "art_city"."project" ("createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "description" character varying NOT NULL, "status" "art_city"."project_status_enum" NOT NULL, "completedAt" TIMESTAMP NOT NULL, "ownerId" uuid, CONSTRAINT "PK_4d68b1358bb5b766d3e78f32f57" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TYPE "art_city"."reimburse_type_enum" AS ENUM('TRAVEL', 'FOOD', 'OTHERS')`,
    );
    await queryRunner.query(
      `CREATE TYPE "art_city"."reimburse_status_enum" AS ENUM('PENDING', 'APPROVED', 'REJECTED')`,
    );
    await queryRunner.query(
      `CREATE TABLE "art_city"."reimburse" ("createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "date" date NOT NULL, "amount" numeric NOT NULL, "description" character varying NOT NULL, "type" "art_city"."reimburse_type_enum" NOT NULL, "status" "art_city"."reimburse_status_enum" NOT NULL, "supportDocument" character varying, "userId" uuid, CONSTRAINT "PK_80e667999362114b4fdb32c9dcd" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "art_city"."schedule" ("createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "date" date NOT NULL, "userId" uuid, CONSTRAINT "PK_1c05e42aec7371641193e180046" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "art_city"."user_detail" ("createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "monthlySalary" integer NOT NULL, "annualLeave" smallint NOT NULL, "userId" uuid, CONSTRAINT "REL_455dfebe9344ffecf1c8e8e054" UNIQUE ("userId"), CONSTRAINT "PK_673613c95633d9058a44041794d" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TYPE "art_city"."user_role_enum" AS ENUM('GUEST', 'ADMIN', 'MANAGER', 'EMPLOYEE')`,
    );
    await queryRunner.query(
      `CREATE TYPE "art_city"."user_department_enum" AS ENUM('ADMIN', 'SALES', 'CS', 'HR')`,
    );
    await queryRunner.query(
      `CREATE TABLE "art_city"."user" ("createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "email" text NOT NULL, "password" text NOT NULL, "firstName" text NOT NULL, "lastName" text NOT NULL, "role" "art_city"."user_role_enum" NOT NULL, "department" "art_city"."user_department_enum" NOT NULL, CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "art_city"."attendance" ("createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "signInAt" TIMESTAMP NOT NULL, "signOutAt" TIMESTAMP, "workHourFrom" TIME NOT NULL, "workHourTo" TIME, "supportDocument" character varying, "remarks" character varying, "userId" uuid, CONSTRAINT "PK_ee0ffe42c1f1a01e72b725c0cb2" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "art_city"."bank" ("createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "bank" character varying NOT NULL, "account" character varying NOT NULL, CONSTRAINT "PK_7651eaf705126155142947926e8" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TYPE "art_city"."external_project_status_enum" AS ENUM('PENDING', 'IN_PROGRESS', 'COMPLETED', 'ABANDONED')`,
    );
    await queryRunner.query(
      `CREATE TABLE "art_city"."external_project" ("createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "description" character varying NOT NULL, "status" "art_city"."external_project_status_enum" NOT NULL, "externalPartyId" uuid, CONSTRAINT "PK_1f3b37817466ad93435d8201e01" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TYPE "art_city"."purchase_status_enum" AS ENUM('PENDING', 'PAID', 'RECEIVED', 'CANCELED')`,
    );
    await queryRunner.query(
      `CREATE TABLE "art_city"."purchase" ("createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "description" character varying NOT NULL, "items" jsonb NOT NULL, "status" "art_city"."purchase_status_enum" NOT NULL, "amount" numeric NOT NULL, "externalPartyId" uuid, CONSTRAINT "REL_a8d19b19b5892091a013caa46f" UNIQUE ("externalPartyId"), CONSTRAINT "PK_86cc2ebeb9e17fc9c0774b05f69" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "art_city"."external_party" ("createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "company" character varying NOT NULL, "contactName" character varying NOT NULL, "contactRole" character varying NOT NULL, "email" character varying, "phone" character varying, "purchasesId" uuid, "externalProjectsId" uuid, CONSTRAINT "PK_8a6437722a7c4a0e09d2dcffdfb" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TYPE "art_city"."shift_application_status_enum" AS ENUM('PENDING', 'APPROVED', 'REJECTED')`,
    );
    await queryRunner.query(
      `CREATE TABLE "art_city"."shift_application" ("createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "fromDate" date NOT NULL, "toDate" date NOT NULL, "reason" character varying, "status" "art_city"."shift_application_status_enum" NOT NULL, "reviewedAt" TIMESTAMP, "userId" uuid, "reviewerId" uuid, CONSTRAINT "PK_3f52a7665723c10c8d62257032c" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "art_city"."system" ("createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "workHourFrom" TIME NOT NULL, "workHourTo" TIME NOT NULL, CONSTRAINT "PK_6b1e6b6f88da9888fde62379945" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "art_city"."user_customer" ("userId" uuid NOT NULL, "customerId" uuid NOT NULL, CONSTRAINT "PK_8435cf8833c15756ddd6453b527" PRIMARY KEY ("userId", "customerId"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_fa9f2a5f04713f2429fde2d930" ON "art_city"."user_customer" ("userId") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_f6567e22a0157abd94a877140f" ON "art_city"."user_customer" ("customerId") `,
    );
    await queryRunner.query(
      `CREATE TABLE "art_city"."user_task" ("userId" uuid NOT NULL, "taskId" uuid NOT NULL, CONSTRAINT "PK_a0db1c8e3e4e9bb4ddf2523fe42" PRIMARY KEY ("userId", "taskId"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_4df8c371c74decf9ef093358da" ON "art_city"."user_task" ("userId") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_be3c9f1acbe21e0070039b5cf7" ON "art_city"."user_task" ("taskId") `,
    );
    await queryRunner.query(
      `ALTER TABLE "art_city"."leave" ADD CONSTRAINT "FK_9fb20081bf48840a16e0d33d14e" FOREIGN KEY ("userId") REFERENCES "art_city"."user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "art_city"."leave" ADD CONSTRAINT "FK_34e0276fce1403a75ac8662e132" FOREIGN KEY ("reviewerId") REFERENCES "art_city"."user"("id") ON DELETE SET NULL ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "art_city"."payroll" ADD CONSTRAINT "FK_542f3c5e009e4502f7c308f33c7" FOREIGN KEY ("userId") REFERENCES "art_city"."user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "art_city"."task" ADD CONSTRAINT "FK_3797a20ef5553ae87af126bc2fe" FOREIGN KEY ("projectId") REFERENCES "art_city"."project"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "art_city"."project" ADD CONSTRAINT "FK_9884b2ee80eb70b7db4f12e8aed" FOREIGN KEY ("ownerId") REFERENCES "art_city"."user"("id") ON DELETE SET NULL ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "art_city"."reimburse" ADD CONSTRAINT "FK_8b224c1be1ba2c8c51dd3022ccb" FOREIGN KEY ("userId") REFERENCES "art_city"."user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "art_city"."schedule" ADD CONSTRAINT "FK_d796103491cf0bae197dda59477" FOREIGN KEY ("userId") REFERENCES "art_city"."user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "art_city"."user_detail" ADD CONSTRAINT "FK_455dfebe9344ffecf1c8e8e054d" FOREIGN KEY ("userId") REFERENCES "art_city"."user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "art_city"."attendance" ADD CONSTRAINT "FK_466e85b813d871bfb693f443528" FOREIGN KEY ("userId") REFERENCES "art_city"."user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "art_city"."external_project" ADD CONSTRAINT "FK_d9d5c67bbc0e22f4c2e54e1e316" FOREIGN KEY ("externalPartyId") REFERENCES "art_city"."external_party"("id") ON DELETE SET NULL ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "art_city"."purchase" ADD CONSTRAINT "FK_a8d19b19b5892091a013caa46f9" FOREIGN KEY ("externalPartyId") REFERENCES "art_city"."external_party"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "art_city"."external_party" ADD CONSTRAINT "FK_87d90ba689d02da8a990f022078" FOREIGN KEY ("purchasesId") REFERENCES "art_city"."purchase"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "art_city"."external_party" ADD CONSTRAINT "FK_49b5727a92ecd37b16572c4d483" FOREIGN KEY ("externalProjectsId") REFERENCES "art_city"."external_project"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "art_city"."shift_application" ADD CONSTRAINT "FK_ff56ef4db03f3995d1e708461e7" FOREIGN KEY ("userId") REFERENCES "art_city"."user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "art_city"."shift_application" ADD CONSTRAINT "FK_cf04167a80324a279324f463f2a" FOREIGN KEY ("reviewerId") REFERENCES "art_city"."user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "art_city"."user_customer" ADD CONSTRAINT "FK_fa9f2a5f04713f2429fde2d930d" FOREIGN KEY ("userId") REFERENCES "art_city"."user"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "art_city"."user_customer" ADD CONSTRAINT "FK_f6567e22a0157abd94a877140f6" FOREIGN KEY ("customerId") REFERENCES "art_city"."customer"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "art_city"."user_task" ADD CONSTRAINT "FK_4df8c371c74decf9ef093358dad" FOREIGN KEY ("userId") REFERENCES "art_city"."user"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "art_city"."user_task" ADD CONSTRAINT "FK_be3c9f1acbe21e0070039b5cf79" FOREIGN KEY ("taskId") REFERENCES "art_city"."task"("id") ON DELETE SET NULL ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "art_city"."user_task" DROP CONSTRAINT "FK_be3c9f1acbe21e0070039b5cf79"`,
    );
    await queryRunner.query(
      `ALTER TABLE "art_city"."user_task" DROP CONSTRAINT "FK_4df8c371c74decf9ef093358dad"`,
    );
    await queryRunner.query(
      `ALTER TABLE "art_city"."user_customer" DROP CONSTRAINT "FK_f6567e22a0157abd94a877140f6"`,
    );
    await queryRunner.query(
      `ALTER TABLE "art_city"."user_customer" DROP CONSTRAINT "FK_fa9f2a5f04713f2429fde2d930d"`,
    );
    await queryRunner.query(
      `ALTER TABLE "art_city"."shift_application" DROP CONSTRAINT "FK_cf04167a80324a279324f463f2a"`,
    );
    await queryRunner.query(
      `ALTER TABLE "art_city"."shift_application" DROP CONSTRAINT "FK_ff56ef4db03f3995d1e708461e7"`,
    );
    await queryRunner.query(
      `ALTER TABLE "art_city"."external_party" DROP CONSTRAINT "FK_49b5727a92ecd37b16572c4d483"`,
    );
    await queryRunner.query(
      `ALTER TABLE "art_city"."external_party" DROP CONSTRAINT "FK_87d90ba689d02da8a990f022078"`,
    );
    await queryRunner.query(
      `ALTER TABLE "art_city"."purchase" DROP CONSTRAINT "FK_a8d19b19b5892091a013caa46f9"`,
    );
    await queryRunner.query(
      `ALTER TABLE "art_city"."external_project" DROP CONSTRAINT "FK_d9d5c67bbc0e22f4c2e54e1e316"`,
    );
    await queryRunner.query(
      `ALTER TABLE "art_city"."attendance" DROP CONSTRAINT "FK_466e85b813d871bfb693f443528"`,
    );
    await queryRunner.query(
      `ALTER TABLE "art_city"."user_detail" DROP CONSTRAINT "FK_455dfebe9344ffecf1c8e8e054d"`,
    );
    await queryRunner.query(
      `ALTER TABLE "art_city"."schedule" DROP CONSTRAINT "FK_d796103491cf0bae197dda59477"`,
    );
    await queryRunner.query(
      `ALTER TABLE "art_city"."reimburse" DROP CONSTRAINT "FK_8b224c1be1ba2c8c51dd3022ccb"`,
    );
    await queryRunner.query(
      `ALTER TABLE "art_city"."project" DROP CONSTRAINT "FK_9884b2ee80eb70b7db4f12e8aed"`,
    );
    await queryRunner.query(
      `ALTER TABLE "art_city"."task" DROP CONSTRAINT "FK_3797a20ef5553ae87af126bc2fe"`,
    );
    await queryRunner.query(
      `ALTER TABLE "art_city"."payroll" DROP CONSTRAINT "FK_542f3c5e009e4502f7c308f33c7"`,
    );
    await queryRunner.query(
      `ALTER TABLE "art_city"."leave" DROP CONSTRAINT "FK_34e0276fce1403a75ac8662e132"`,
    );
    await queryRunner.query(
      `ALTER TABLE "art_city"."leave" DROP CONSTRAINT "FK_9fb20081bf48840a16e0d33d14e"`,
    );
    await queryRunner.query(
      `DROP INDEX "art_city"."IDX_be3c9f1acbe21e0070039b5cf7"`,
    );
    await queryRunner.query(
      `DROP INDEX "art_city"."IDX_4df8c371c74decf9ef093358da"`,
    );
    await queryRunner.query(`DROP TABLE "art_city"."user_task"`);
    await queryRunner.query(
      `DROP INDEX "art_city"."IDX_f6567e22a0157abd94a877140f"`,
    );
    await queryRunner.query(
      `DROP INDEX "art_city"."IDX_fa9f2a5f04713f2429fde2d930"`,
    );
    await queryRunner.query(`DROP TABLE "art_city"."user_customer"`);
    await queryRunner.query(`DROP TABLE "art_city"."system"`);
    await queryRunner.query(`DROP TABLE "art_city"."shift_application"`);
    await queryRunner.query(
      `DROP TYPE "art_city"."shift_application_status_enum"`,
    );
    await queryRunner.query(`DROP TABLE "art_city"."external_party"`);
    await queryRunner.query(`DROP TABLE "art_city"."purchase"`);
    await queryRunner.query(`DROP TYPE "art_city"."purchase_status_enum"`);
    await queryRunner.query(`DROP TABLE "art_city"."external_project"`);
    await queryRunner.query(
      `DROP TYPE "art_city"."external_project_status_enum"`,
    );
    await queryRunner.query(`DROP TABLE "art_city"."bank"`);
    await queryRunner.query(`DROP TABLE "art_city"."attendance"`);
    await queryRunner.query(`DROP TABLE "art_city"."user"`);
    await queryRunner.query(`DROP TYPE "art_city"."user_department_enum"`);
    await queryRunner.query(`DROP TYPE "art_city"."user_role_enum"`);
    await queryRunner.query(`DROP TABLE "art_city"."user_detail"`);
    await queryRunner.query(`DROP TABLE "art_city"."schedule"`);
    await queryRunner.query(`DROP TABLE "art_city"."reimburse"`);
    await queryRunner.query(`DROP TYPE "art_city"."reimburse_status_enum"`);
    await queryRunner.query(`DROP TYPE "art_city"."reimburse_type_enum"`);
    await queryRunner.query(`DROP TABLE "art_city"."project"`);
    await queryRunner.query(`DROP TYPE "art_city"."project_status_enum"`);
    await queryRunner.query(`DROP TABLE "art_city"."task"`);
    await queryRunner.query(`DROP TYPE "art_city"."task_status_enum"`);
    await queryRunner.query(`DROP TYPE "art_city"."task_visibleto_enum"`);
    await queryRunner.query(`DROP TABLE "art_city"."payroll"`);
    await queryRunner.query(`DROP TYPE "art_city"."payroll_type_enum"`);
    await queryRunner.query(`DROP TABLE "art_city"."leave"`);
    await queryRunner.query(`DROP TYPE "art_city"."leave_type_enum"`);
    await queryRunner.query(`DROP TYPE "art_city"."leave_status_enum"`);
    await queryRunner.query(`DROP TABLE "art_city"."customer"`);
    await queryRunner.query(`DROP TYPE "art_city"."customer_type_enum"`);
    await queryRunner.query(`DROP TYPE "art_city"."customer_source_enum"`);
  }
}
