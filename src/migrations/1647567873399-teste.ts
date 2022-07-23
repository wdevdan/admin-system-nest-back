import {MigrationInterface, QueryRunner} from "typeorm";

export class testeMigration1647567873399 implements MigrationInterface {
    name = 'testeMigration1647567873399'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "development"."item" ("uid" uuid NOT NULL DEFAULT uuid_generate_v4(), "id" integer NOT NULL DEFAULT '0', "isActive" boolean NOT NULL DEFAULT true, "isArchived" boolean NOT NULL DEFAULT false, "updatedBy" character varying(255) NOT NULL, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP WITH TIME ZONE DEFAULT now(), "name" character varying(256) NOT NULL, "description" character varying(256) NOT NULL, CONSTRAINT "PK_709f78f6379b59dfbb435cb68e3" PRIMARY KEY ("uid"))`);
        await queryRunner.query(`CREATE TABLE "development"."user" ("uid" uuid NOT NULL DEFAULT uuid_generate_v4(), "id" integer NOT NULL DEFAULT '0', "isActive" boolean NOT NULL DEFAULT true, "isArchived" boolean NOT NULL DEFAULT false, "createdBy" character varying(255) NOT NULL, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP WITH TIME ZONE DEFAULT now(), "updatedBy" character varying(255) NOT NULL, "internalComment" character varying(255), "name" character varying(300) NOT NULL, "username" character varying(300) NOT NULL, CONSTRAINT "PK_df955cae05f17b2bcf5045cc021" PRIMARY KEY ("uid"))`);
        await queryRunner.query(`CREATE TABLE "development"."user-data" ("uid" uuid NOT NULL DEFAULT uuid_generate_v4(), "id" integer NOT NULL DEFAULT '0', "isActive" boolean NOT NULL DEFAULT true, "isArchived" boolean NOT NULL DEFAULT false, "updatedBy" character varying(255) NOT NULL, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP WITH TIME ZONE DEFAULT now(), "userUid" character varying(256) NOT NULL, "name" character varying(256) NOT NULL, "alias" character varying(256), "middleName" character varying(256), "lastName" character varying(256), "email" character varying(256), "document" character varying(256), CONSTRAINT "PK_c193ef866e5301a63691be95127" PRIMARY KEY ("uid"))`);
        await queryRunner.query(`ALTER TABLE "development"."user" DROP COLUMN "createdBy"`);
        await queryRunner.query(`ALTER TABLE "development"."user" DROP COLUMN "internalComment"`);
        await queryRunner.query(`ALTER TABLE "development"."user" DROP COLUMN "name"`);
        await queryRunner.query(`ALTER TABLE "development"."item" ADD "createdBy" character varying(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "development"."item" ADD "internalComment" character varying(255)`);
        await queryRunner.query(`ALTER TABLE "development"."user" ADD "createdBy" character varying(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "development"."user" ADD "internalComment" character varying(255)`);
        await queryRunner.query(`ALTER TABLE "development"."user" ADD "name" character varying(300) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "development"."user" ADD "login" character varying(256) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "development"."user" ADD "password" character varying(256) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "development"."item" DROP COLUMN "name"`);
        await queryRunner.query(`ALTER TABLE "development"."item" ADD "name" character varying(300) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "development"."item" DROP COLUMN "description"`);
        await queryRunner.query(`ALTER TABLE "development"."item" ADD "description" character varying(300) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "development"."user" DROP COLUMN "username"`);
        await queryRunner.query(`ALTER TABLE "development"."user" ADD "username" character varying(256) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "development"."item" DROP COLUMN "name"`);
        await queryRunner.query(`ALTER TABLE "development"."item" ADD "name" character varying(256) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "development"."item" DROP COLUMN "description"`);
        await queryRunner.query(`ALTER TABLE "development"."item" ADD "description" character varying(256) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "development"."item" DROP COLUMN "description"`);
        await queryRunner.query(`ALTER TABLE "development"."item" ADD "description" character varying(300) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "development"."item" DROP COLUMN "name"`);
        await queryRunner.query(`ALTER TABLE "development"."item" ADD "name" character varying(300) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "development"."user" DROP COLUMN "username"`);
        await queryRunner.query(`ALTER TABLE "development"."user" ADD "username" character varying(300) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "development"."item" DROP COLUMN "description"`);
        await queryRunner.query(`ALTER TABLE "development"."item" ADD "description" character varying(256) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "development"."item" DROP COLUMN "name"`);
        await queryRunner.query(`ALTER TABLE "development"."item" ADD "name" character varying(256) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "development"."user" DROP COLUMN "password"`);
        await queryRunner.query(`ALTER TABLE "development"."user" DROP COLUMN "login"`);
        await queryRunner.query(`ALTER TABLE "development"."user" DROP COLUMN "name"`);
        await queryRunner.query(`ALTER TABLE "development"."user" DROP COLUMN "internalComment"`);
        await queryRunner.query(`ALTER TABLE "development"."user" DROP COLUMN "createdBy"`);
        await queryRunner.query(`ALTER TABLE "development"."item" DROP COLUMN "internalComment"`);
        await queryRunner.query(`ALTER TABLE "development"."item" DROP COLUMN "createdBy"`);
        await queryRunner.query(`ALTER TABLE "development"."user" ADD "name" character varying(300) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "development"."user" ADD "internalComment" character varying(255)`);
        await queryRunner.query(`ALTER TABLE "development"."user" ADD "createdBy" character varying(255) NOT NULL`);
        await queryRunner.query(`DROP TABLE "development"."user-data"`);
        await queryRunner.query(`DROP TABLE "development"."user"`);
        await queryRunner.query(`DROP TABLE "development"."item"`);
    }

}
