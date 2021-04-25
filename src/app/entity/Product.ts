import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  ManyToOne,
} from "typeorm";
import { AbstractEntity } from "./AbstractEntity";
import { Seller } from "./Seller";

@Entity()
export class Product implements AbstractEntity {
  @PrimaryGeneratedColumn("uuid")
  public id: string;

  @Column({ nullable: false })
  public name: string;

  @Column({ nullable: true })
  public discription?: string;

  @ManyToOne((type) => Seller, (seller) => seller.product, { nullable: false })
  public seller: Seller;

  @CreateDateColumn({ type: "timestamptz", update: false })
  public createdAt: Date;

  @Column({ nullable: true })
  public createdBy?: string;

  @UpdateDateColumn({ type: "timestamptz", update: false })
  public updatedAt: Date;

  @Column({ nullable: true })
  public updatedBy?: string;
}
