import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  OneToMany,
} from "typeorm";
import { AbstractEntity } from "./AbstractEntity";
import { Product } from "./Product";

@Entity()
export class Seller implements AbstractEntity {
  @PrimaryGeneratedColumn("uuid")
  public id: string;

  @Column({ nullable: false })
  public name: string;

  @Column({ nullable: true })
  public address?: string;

  @OneToMany((type) => Product, (product) => product.seller, { nullable: true })
  public product?: Product[];

  @CreateDateColumn({ type: "timestamptz", update: false })
  public createdAt: Date;

  @Column({ nullable: true })
  public createdBy?: string;

  @UpdateDateColumn({ type: "timestamptz", update: false })
  public updatedAt: Date;

  @Column({ nullable: true })
  public updatedBy?: string;
}
