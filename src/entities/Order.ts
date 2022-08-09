import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  Generated,
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
  @Generated("uuid")
  orderNumber: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Column({ type: "boolean", default: false })
  isCompleted: boolean;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  address: string;

  @Column()
  city: string;

  @Column()
  mobile: string;

  // @ManyToOne(() => Client, (client) => client.orders, { nullable: false })
  // client: Client;

  @OneToMany(() => OrderLine, (orderLines) => orderLines.order, {
    nullable: false,
  })
  orderLines: OrderLine[];
}
