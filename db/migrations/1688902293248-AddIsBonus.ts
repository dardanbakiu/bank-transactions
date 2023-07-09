import { MigrationInterface, QueryRunner } from "typeorm";

export class AddIsBonus1688902293248 implements MigrationInterface {
    name = 'AddIsBonus1688902293248'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`bonusBalance\``);
        await queryRunner.query(`ALTER TABLE \`transaction\` ADD \`isBonus\` tinyint NOT NULL DEFAULT 0`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`transaction\` DROP COLUMN \`isBonus\``);
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`bonusBalance\` decimal(10,0) NOT NULL DEFAULT '0'`);
    }

}
