import { MigrationInterface, QueryRunner } from "typeorm";

export class UserTaskDeleteOnCascade21717691906447 implements MigrationInterface {
    name = 'UserTaskDeleteOnCascade21717691906447'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "art_city"."user_task" DROP CONSTRAINT "FK_4df8c371c74decf9ef093358dad"`);
        await queryRunner.query(`ALTER TABLE "art_city"."user_task" ADD CONSTRAINT "FK_4df8c371c74decf9ef093358dad" FOREIGN KEY ("userId") REFERENCES "art_city"."user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "art_city"."user_task" DROP CONSTRAINT "FK_4df8c371c74decf9ef093358dad"`);
        await queryRunner.query(`ALTER TABLE "art_city"."user_task" ADD CONSTRAINT "FK_4df8c371c74decf9ef093358dad" FOREIGN KEY ("userId") REFERENCES "art_city"."user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
