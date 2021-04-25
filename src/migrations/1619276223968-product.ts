import {MigrationInterface, QueryRunner} from "typeorm";

export class product1619276223968 implements MigrationInterface {
    name = 'product1619276223968'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "product_management"."product" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "discription" character varying, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "created_by" character varying, "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_by" character varying, "seller_id" uuid NOT NULL, CONSTRAINT "PK_d34144ada1b1c1316c0d0dd4e8a" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "product_management"."product" ADD CONSTRAINT "FK_9ae6a49f0d937a4807aef52d603" FOREIGN KEY ("seller_id") REFERENCES "product_management"."seller"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "product_management"."product" DROP CONSTRAINT "FK_9ae6a49f0d937a4807aef52d603"`);
        await queryRunner.query(`DROP TABLE "product_management"."product"`);
    }

}
