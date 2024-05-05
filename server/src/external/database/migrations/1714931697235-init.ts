import { MigrationInterface, QueryRunner } from "typeorm";

export class Init1714931697235 implements MigrationInterface {
    name = 'Init1714931697235'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "art_city"."shift_application" DROP COLUMN "fromDate"`);
        await queryRunner.query(`ALTER TABLE "art_city"."shift_application" ADD "fromDate" date NOT NULL`);
        await queryRunner.query(`ALTER TABLE "art_city"."shift_application" DROP COLUMN "toDate"`);
        await queryRunner.query(`ALTER TABLE "art_city"."shift_application" ADD "toDate" date NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "art_city"."shift_application" DROP COLUMN "toDate"`);
        await queryRunner.query(`ALTER TABLE "art_city"."shift_application" ADD "toDate" TIMESTAMP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "art_city"."shift_application" DROP COLUMN "fromDate"`);
        await queryRunner.query(`ALTER TABLE "art_city"."shift_application" ADD "fromDate" TIMESTAMP NOT NULL`);
    }

}
