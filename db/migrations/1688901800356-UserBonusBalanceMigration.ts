import { MigrationInterface, QueryRunner } from "typeorm";

export class UserBonusBalanceMigration1688901800356 implements MigrationInterface {
    name = 'UserBonusBalanceMigration1688901800356'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`bonusBalance\` decimal NOT NULL DEFAULT '0'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`bonusBalance\``);
    }

}
