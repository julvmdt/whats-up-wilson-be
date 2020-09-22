import {MigrationInterface, QueryRunner} from "typeorm";

export class AddMessageEntity1600796393940 implements MigrationInterface {
    name = 'AddMessageEntity1600796393940'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "message_entity" ADD "hasSeen" integer array`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "message_entity" DROP COLUMN "hasSeen"`);
    }

}
