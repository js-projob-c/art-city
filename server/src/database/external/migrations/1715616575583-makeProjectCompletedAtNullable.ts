import { MigrationInterface, QueryRunner } from 'typeorm';

export class MakeProjectCompletedAtNullable1715616575583
  implements MigrationInterface
{
  name = 'MakeProjectCompletedAtNullable1715616575583';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "art_city"."project" ALTER COLUMN "completedAt" DROP NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "art_city"."project" ALTER COLUMN "completedAt" SET NOT NULL`,
    );
  }
}
