import { MigrationInterface, QueryRunner } from 'typeorm';

export class MoveJoinTableFromUserToTask1715755997988
  implements MigrationInterface
{
  name = 'MoveJoinTableFromUserToTask1715755997988';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "art_city"."user_task" DROP CONSTRAINT "FK_4df8c371c74decf9ef093358dad"`,
    );
    await queryRunner.query(
      `ALTER TABLE "art_city"."user_task" DROP CONSTRAINT "FK_be3c9f1acbe21e0070039b5cf79"`,
    );
    await queryRunner.query(
      `ALTER TABLE "art_city"."user_task" ADD CONSTRAINT "FK_be3c9f1acbe21e0070039b5cf79" FOREIGN KEY ("taskId") REFERENCES "art_city"."task"("id") ON DELETE SET NULL ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "art_city"."user_task" ADD CONSTRAINT "FK_4df8c371c74decf9ef093358dad" FOREIGN KEY ("userId") REFERENCES "art_city"."user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "art_city"."user_task" DROP CONSTRAINT "FK_4df8c371c74decf9ef093358dad"`,
    );
    await queryRunner.query(
      `ALTER TABLE "art_city"."user_task" DROP CONSTRAINT "FK_be3c9f1acbe21e0070039b5cf79"`,
    );
    await queryRunner.query(
      `ALTER TABLE "art_city"."user_task" ADD CONSTRAINT "FK_be3c9f1acbe21e0070039b5cf79" FOREIGN KEY ("taskId") REFERENCES "art_city"."task"("id") ON DELETE SET NULL ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "art_city"."user_task" ADD CONSTRAINT "FK_4df8c371c74decf9ef093358dad" FOREIGN KEY ("userId") REFERENCES "art_city"."user"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
  }
}
