import { MigrationInterface, QueryRunner } from "typeorm";

export class FloatLeaveDays1717221672243 implements MigrationInterface {
    name = 'FloatLeaveDays1717221672243'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "art_city"."leave" DROP COLUMN "days"`);
        await queryRunner.query(`ALTER TABLE "art_city"."leave" ADD "days" double precision NOT NULL DEFAULT '0'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "art_city"."leave" DROP COLUMN "days"`);
        await queryRunner.query(`ALTER TABLE "art_city"."leave" ADD "days" smallint NOT NULL`);
    }

}
