import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { Client } from "./Client";
import { OrderLine } from "./OrderLine";

@Entity()
export class Order extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  orderNumber: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Column({ type: "boolean", default: false })
  isCompleted: boolean;

  @ManyToOne(() => Client, (client) => client.orders, { nullable: false })
  client: Client;

  @OneToMany(() => OrderLine, (orderLines) => orderLines.product, {
    nullable: true,
  })
  orderLines: OrderLine[];
}
