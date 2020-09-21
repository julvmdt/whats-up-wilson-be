import {MigrationInterface, QueryRunner} from "typeorm";

export class AddMessageAndChat1600627835029 implements MigrationInterface {
    name = 'AddMessageAndChat1600627835029'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "message_entity" ("createdAt" TIMESTAMP NOT NULL DEFAULT now(), "id" SERIAL NOT NULL, "message" text NOT NULL, "chatId" integer, "senderId" integer, CONSTRAINT "PK_45bb3707fbb99a73e831fee41e0" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "chat_entity" ("createdAt" TIMESTAMP NOT NULL DEFAULT now(), "id" SERIAL NOT NULL, CONSTRAINT "PK_07e65670b36d025a69930ae6f2e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "chat_entity_users_user_entity" ("chatEntityId" integer NOT NULL, "userEntityId" integer NOT NULL, CONSTRAINT "PK_cac5e8417ade2ee10bf641c3e04" PRIMARY KEY ("chatEntityId", "userEntityId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_719d6c52a890dedb6a91649ee9" ON "chat_entity_users_user_entity" ("chatEntityId") `);
        await queryRunner.query(`CREATE INDEX "IDX_e0c079af3c8be314148b10e6c7" ON "chat_entity_users_user_entity" ("userEntityId") `);
        await queryRunner.query(`ALTER TABLE "message_entity" ADD CONSTRAINT "FK_ed96c9fd7ed83ee4ec5c286e3b9" FOREIGN KEY ("chatId") REFERENCES "chat_entity"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "message_entity" ADD CONSTRAINT "FK_e88494eab57fef78157e330fe29" FOREIGN KEY ("senderId") REFERENCES "user_entity"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "chat_entity_users_user_entity" ADD CONSTRAINT "FK_719d6c52a890dedb6a91649ee9e" FOREIGN KEY ("chatEntityId") REFERENCES "chat_entity"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "chat_entity_users_user_entity" ADD CONSTRAINT "FK_e0c079af3c8be314148b10e6c73" FOREIGN KEY ("userEntityId") REFERENCES "user_entity"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "chat_entity_users_user_entity" DROP CONSTRAINT "FK_e0c079af3c8be314148b10e6c73"`);
        await queryRunner.query(`ALTER TABLE "chat_entity_users_user_entity" DROP CONSTRAINT "FK_719d6c52a890dedb6a91649ee9e"`);
        await queryRunner.query(`ALTER TABLE "message_entity" DROP CONSTRAINT "FK_e88494eab57fef78157e330fe29"`);
        await queryRunner.query(`ALTER TABLE "message_entity" DROP CONSTRAINT "FK_ed96c9fd7ed83ee4ec5c286e3b9"`);
        await queryRunner.query(`DROP INDEX "IDX_e0c079af3c8be314148b10e6c7"`);
        await queryRunner.query(`DROP INDEX "IDX_719d6c52a890dedb6a91649ee9"`);
        await queryRunner.query(`DROP TABLE "chat_entity_users_user_entity"`);
        await queryRunner.query(`DROP TABLE "chat_entity"`);
        await queryRunner.query(`DROP TABLE "message_entity"`);
    }

}
