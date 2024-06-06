import { MigrationInterface, QueryRunner } from "typeorm";

export class UserTaskDeleteOnCascade1717691774501 implements MigrationInterface {
    name = 'UserTaskDeleteOnCascade1717691774501'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "art_city"."user_task" DROP CONSTRAINT "FK_be3c9f1acbe21e0070039b5cf79"`);
        await queryRunner.query(`ALTER TYPE "art_city"."user_role_enum" RENAME TO "user_role_enum_old"`);
        await queryRunner.query(`CREATE TYPE "art_city"."user_role_enum" AS ENUM('ADMIN', 'MANAGER', 'EMPLOYEE')`);
        await queryRunner.query(`ALTER TABLE "art_city"."user" ALTER COLUMN "role" TYPE "art_city"."user_role_enum" USING "role"::"text"::"art_city"."user_role_enum"`);
        await queryRunner.query(`DROP TYPE "art_city"."user_role_enum_old"`);
        await queryRunner.query(`ALTER TABLE "art_city"."user_task" ADD CONSTRAINT "FK_be3c9f1acbe21e0070039b5cf79" FOREIGN KEY ("taskId") REFERENCES "art_city"."task"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "art_city"."user_task" DROP CONSTRAINT "FK_be3c9f1acbe21e0070039b5cf79"`);
        await queryRunner.query(`CREATE TYPE "art_city"."user_role_enum_old" AS ENUM('GUEST', 'ADMIN', 'MANAGER', 'EMPLOYEE')`);
        await queryRunner.query(`ALTER TABLE "art_city"."user" ALTER COLUMN "role" TYPE "art_city"."user_role_enum_old" USING "role"::"text"::"art_city"."user_role_enum_old"`);
        await queryRunner.query(`DROP TYPE "art_city"."user_role_enum"`);
        await queryRunner.query(`ALTER TYPE "art_city"."user_role_enum_old" RENAME TO "user_role_enum"`);
        await queryRunner.query(`ALTER TABLE "art_city"."user_task" ADD CONSTRAINT "FK_be3c9f1acbe21e0070039b5cf79" FOREIGN KEY ("taskId") REFERENCES "art_city"."task"("id") ON DELETE SET NULL ON UPDATE CASCADE`);
    }

}
