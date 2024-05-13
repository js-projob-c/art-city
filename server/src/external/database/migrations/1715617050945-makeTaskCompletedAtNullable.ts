import { MigrationInterface, QueryRunner } from "typeorm";

export class MakeTaskCompletedAtNullable1715617050945 implements MigrationInterface {
    name = 'MakeTaskCompletedAtNullable1715617050945'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "art_city"."task" ALTER COLUMN "completedAt" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "art_city"."task" ALTER COLUMN "completedAt" SET NOT NULL`);
    }

}
