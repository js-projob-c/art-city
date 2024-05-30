import { MigrationInterface, QueryRunner } from "typeorm";

export class Cascade1717090841968 implements MigrationInterface {
    name = 'Cascade1717090841968'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "art_city"."user_task" DROP CONSTRAINT "FK_4df8c371c74decf9ef093358dad"`);
        await queryRunner.query(`ALTER TABLE "art_city"."user_customer" DROP CONSTRAINT "FK_fa9f2a5f04713f2429fde2d930d"`);
        await queryRunner.query(`ALTER TABLE "art_city"."user_task" ADD CONSTRAINT "FK_4df8c371c74decf9ef093358dad" FOREIGN KEY ("userId") REFERENCES "art_city"."user"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "art_city"."user_customer" ADD CONSTRAINT "FK_fa9f2a5f04713f2429fde2d930d" FOREIGN KEY ("userId") REFERENCES "art_city"."user"("id") ON DELETE SET NULL ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "art_city"."user_customer" DROP CONSTRAINT "FK_fa9f2a5f04713f2429fde2d930d"`);
        await queryRunner.query(`ALTER TABLE "art_city"."user_task" DROP CONSTRAINT "FK_4df8c371c74decf9ef093358dad"`);
        await queryRunner.query(`ALTER TABLE "art_city"."user_customer" ADD CONSTRAINT "FK_fa9f2a5f04713f2429fde2d930d" FOREIGN KEY ("userId") REFERENCES "art_city"."user"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "art_city"."user_task" ADD CONSTRAINT "FK_4df8c371c74decf9ef093358dad" FOREIGN KEY ("userId") REFERENCES "art_city"."user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
