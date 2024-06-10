import { MigrationInterface, QueryRunner } from "typeorm";

export class DefaultValueForUserDetail1718042939273 implements MigrationInterface {
    name = 'DefaultValueForUserDetail1718042939273'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "art_city"."user_detail" ALTER COLUMN "monthlySalary" SET DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE "art_city"."user_detail" ALTER COLUMN "annualLeave" SET DEFAULT '0'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "art_city"."user_detail" ALTER COLUMN "annualLeave" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "art_city"."user_detail" ALTER COLUMN "monthlySalary" DROP DEFAULT`);
    }

}
