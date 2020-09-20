import {MigrationInterface, QueryRunner} from "typeorm";

export class UserMigration1600589780393 implements MigrationInterface {
    name = 'UserMigration1600589780393'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "user_entity" ("createdAt" TIMESTAMP NOT NULL DEFAULT now(), "id" SERIAL NOT NULL, "userName" text NOT NULL, "password" text NOT NULL, CONSTRAINT "PK_b54f8ea623b17094db7667d8206" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "user_entity"`);
    }

}
