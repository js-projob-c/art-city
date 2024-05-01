import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddLeaveType1714591909214 implements MigrationInterface {
  name = 'AddLeaveType1714591909214';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TYPE "art_city"."leave_type_enum" AS ENUM('ANNUAL', 'SICK', 'OTHERS')`,
    );
    await queryRunner.query(
      `ALTER TABLE "art_city"."leave" ADD "type" "art_city"."leave_type_enum" NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TYPE "art_city"."leave_status_enum" RENAME TO "leave_status_enum_old"`,
    );
    await queryRunner.query(
      `CREATE TYPE "art_city"."leave_status_enum" AS ENUM('PENDING', 'APPROVED', 'REJECTED', 'CANCELLED')`,
    );
    await queryRunner.query(
      `ALTER TABLE "art_city"."leave" ALTER COLUMN "status" TYPE "art_city"."leave_status_enum" USING "status"::"text"::"art_city"."leave_status_enum"`,
    );
    await queryRunner.query(`DROP TYPE "art_city"."leave_status_enum_old"`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TYPE "art_city"."leave_status_enum_old" AS ENUM('PENDING', 'APPROVED', 'REJECTED')`,
    );
    await queryRunner.query(
      `ALTER TABLE "art_city"."leave" ALTER COLUMN "status" TYPE "art_city"."leave_status_enum_old" USING "status"::"text"::"art_city"."leave_status_enum_old"`,
    );
    await queryRunner.query(`DROP TYPE "art_city"."leave_status_enum"`);
    await queryRunner.query(
      `ALTER TYPE "art_city"."leave_status_enum_old" RENAME TO "leave_status_enum"`,
    );
    await queryRunner.query(
      `ALTER TABLE "art_city"."leave" DROP COLUMN "type"`,
    );
    await queryRunner.query(`DROP TYPE "art_city"."leave_type_enum"`);
  }
}
