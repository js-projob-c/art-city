import { MigrationInterface, QueryRunner } from 'typeorm';

export class Init1714415164707 implements MigrationInterface {
  name = 'Init1714415164707';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "art_city"."user_detail" DROP COLUMN "monthlySalary"`,
    );
    await queryRunner.query(
      `ALTER TABLE "art_city"."user_detail" ADD "monthlySalary" integer NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "art_city"."user_detail" DROP COLUMN "monthlySalary"`,
    );
    await queryRunner.query(
      `ALTER TABLE "art_city"."user_detail" ADD "monthlySalary" numeric NOT NULL`,
    );
  }
}
