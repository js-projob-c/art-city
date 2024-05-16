import { MigrationInterface, QueryRunner } from 'typeorm';

export class ExternalPartyRefactor1715798371828 implements MigrationInterface {
  name = 'ExternalPartyRefactor1715798371828';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "art_city"."external_party" DROP CONSTRAINT "FK_87d90ba689d02da8a990f022078"`,
    );
    await queryRunner.query(
      `ALTER TABLE "art_city"."external_party" DROP CONSTRAINT "FK_49b5727a92ecd37b16572c4d483"`,
    );
    await queryRunner.query(
      `ALTER TABLE "art_city"."external_project" DROP CONSTRAINT "FK_d9d5c67bbc0e22f4c2e54e1e316"`,
    );
    await queryRunner.query(
      `ALTER TABLE "art_city"."purchase" DROP CONSTRAINT "FK_a8d19b19b5892091a013caa46f9"`,
    );
    await queryRunner.query(
      `ALTER TABLE "art_city"."external_project" RENAME COLUMN "externalPartyId" TO "externalPartyDetails"`,
    );
    await queryRunner.query(
      `ALTER TABLE "art_city"."purchase" RENAME COLUMN "externalPartyId" TO "externalPartyDetails"`,
    );
    await queryRunner.query(
      `ALTER TABLE "art_city"."external_party" DROP COLUMN "purchasesId"`,
    );
    await queryRunner.query(
      `ALTER TABLE "art_city"."external_party" DROP COLUMN "externalProjectsId"`,
    );
    await queryRunner.query(
      `CREATE TYPE "art_city"."external_party_types_enum" AS ENUM('CUSTOMER', 'SELLER', 'EXTERNAL_PROJECT')`,
    );
    await queryRunner.query(
      `ALTER TABLE "art_city"."external_party" ADD "types" "art_city"."external_party_types_enum" array NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "art_city"."external_party" ADD "customerSource" character varying`,
    );
    await queryRunner.query(
      `CREATE TYPE "art_city"."external_party_customertype_enum" AS ENUM('EXISTING', 'POTENTIAL')`,
    );
    await queryRunner.query(
      `ALTER TABLE "art_city"."external_party" ADD "customerType" "art_city"."external_party_customertype_enum"`,
    );
    await queryRunner.query(
      `ALTER TABLE "art_city"."external_project" DROP COLUMN "externalPartyDetails"`,
    );
    await queryRunner.query(
      `ALTER TABLE "art_city"."external_project" ADD "externalPartyDetails" jsonb NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "art_city"."purchase" DROP COLUMN "externalPartyDetails"`,
    );
    await queryRunner.query(
      `ALTER TABLE "art_city"."purchase" ADD "externalPartyDetails" jsonb NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "art_city"."purchase" DROP COLUMN "externalPartyDetails"`,
    );
    await queryRunner.query(
      `ALTER TABLE "art_city"."purchase" ADD "externalPartyDetails" uuid`,
    );
    await queryRunner.query(
      `ALTER TABLE "art_city"."external_project" DROP COLUMN "externalPartyDetails"`,
    );
    await queryRunner.query(
      `ALTER TABLE "art_city"."external_project" ADD "externalPartyDetails" uuid`,
    );
    await queryRunner.query(
      `ALTER TABLE "art_city"."external_party" DROP COLUMN "customerType"`,
    );
    await queryRunner.query(
      `DROP TYPE "art_city"."external_party_customertype_enum"`,
    );
    await queryRunner.query(
      `ALTER TABLE "art_city"."external_party" DROP COLUMN "customerSource"`,
    );
    await queryRunner.query(
      `ALTER TABLE "art_city"."external_party" DROP COLUMN "types"`,
    );
    await queryRunner.query(`DROP TYPE "art_city"."external_party_types_enum"`);
    await queryRunner.query(
      `ALTER TABLE "art_city"."external_party" ADD "externalProjectsId" uuid`,
    );
    await queryRunner.query(
      `ALTER TABLE "art_city"."external_party" ADD "purchasesId" uuid`,
    );
    await queryRunner.query(
      `ALTER TABLE "art_city"."purchase" RENAME COLUMN "externalPartyDetails" TO "externalPartyId"`,
    );
    await queryRunner.query(
      `ALTER TABLE "art_city"."external_project" RENAME COLUMN "externalPartyDetails" TO "externalPartyId"`,
    );
    await queryRunner.query(
      `ALTER TABLE "art_city"."purchase" ADD CONSTRAINT "FK_a8d19b19b5892091a013caa46f9" FOREIGN KEY ("externalPartyId") REFERENCES "art_city"."external_party"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "art_city"."external_project" ADD CONSTRAINT "FK_d9d5c67bbc0e22f4c2e54e1e316" FOREIGN KEY ("externalPartyId") REFERENCES "art_city"."external_party"("id") ON DELETE SET NULL ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "art_city"."external_party" ADD CONSTRAINT "FK_49b5727a92ecd37b16572c4d483" FOREIGN KEY ("externalProjectsId") REFERENCES "art_city"."external_project"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "art_city"."external_party" ADD CONSTRAINT "FK_87d90ba689d02da8a990f022078" FOREIGN KEY ("purchasesId") REFERENCES "art_city"."purchase"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }
}
