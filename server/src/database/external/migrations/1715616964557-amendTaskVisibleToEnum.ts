import { MigrationInterface, QueryRunner } from 'typeorm';

export class AmendTaskVisibleToEnum1715616964557 implements MigrationInterface {
  name = 'AmendTaskVisibleToEnum1715616964557';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TYPE "art_city"."task_visibleto_enum" RENAME TO "task_visibleto_enum_old"`,
    );
    await queryRunner.query(
      `CREATE TYPE "art_city"."task_visibleto_enum" AS ENUM('ALL', 'INVISIBLE', 'DEPARTMENT', 'ASSIGNEE')`,
    );
    await queryRunner.query(
      `ALTER TABLE "art_city"."task" ALTER COLUMN "visibleTo" TYPE "art_city"."task_visibleto_enum" USING "visibleTo"::"text"::"art_city"."task_visibleto_enum"`,
    );
    await queryRunner.query(`DROP TYPE "art_city"."task_visibleto_enum_old"`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TYPE "art_city"."task_visibleto_enum_old" AS ENUM('INVISIBLE', 'DEPARTMENT', 'ASSIGNEE')`,
    );
    await queryRunner.query(
      `ALTER TABLE "art_city"."task" ALTER COLUMN "visibleTo" TYPE "art_city"."task_visibleto_enum_old" USING "visibleTo"::"text"::"art_city"."task_visibleto_enum_old"`,
    );
    await queryRunner.query(`DROP TYPE "art_city"."task_visibleto_enum"`);
    await queryRunner.query(
      `ALTER TYPE "art_city"."task_visibleto_enum_old" RENAME TO "task_visibleto_enum"`,
    );
  }
}
