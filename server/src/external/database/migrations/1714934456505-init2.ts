import { MigrationInterface, QueryRunner } from "typeorm";

export class Init21714934456505 implements MigrationInterface {
    name = 'Init21714934456505'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "art_city"."shift_application" DROP CONSTRAINT "FK_cf04167a80324a279324f463f2a"`);
        await queryRunner.query(`ALTER TABLE "art_city"."shift_application" DROP CONSTRAINT "REL_cf04167a80324a279324f463f2"`);
        await queryRunner.query(`ALTER TABLE "art_city"."shift_application" ADD CONSTRAINT "FK_cf04167a80324a279324f463f2a" FOREIGN KEY ("reviewerId") REFERENCES "art_city"."user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "art_city"."shift_application" DROP CONSTRAINT "FK_cf04167a80324a279324f463f2a"`);
        await queryRunner.query(`ALTER TABLE "art_city"."shift_application" ADD CONSTRAINT "REL_cf04167a80324a279324f463f2" UNIQUE ("reviewerId")`);
        await queryRunner.query(`ALTER TABLE "art_city"."shift_application" ADD CONSTRAINT "FK_cf04167a80324a279324f463f2a" FOREIGN KEY ("reviewerId") REFERENCES "art_city"."user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
