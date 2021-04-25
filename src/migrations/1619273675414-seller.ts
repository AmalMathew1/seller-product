import {MigrationInterface, QueryRunner} from "typeorm";

export class seller1619273675414 implements MigrationInterface {
    name = 'seller1619273675414'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "product_management"."seller" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "address" character varying, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "created_by" character varying, "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_by" character varying, CONSTRAINT "PK_11c75defa88a29eca6596cbffa6" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "product_management"."seller"`);
    }

}
