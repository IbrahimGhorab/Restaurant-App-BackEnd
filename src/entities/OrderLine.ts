import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { Order } from "./Order";
import { Product } from "./Product";

@Entity()
export class OrderLine extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  quantity: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => Order, (order) => order.orderLines ,{nullable:false})
  order: Order;

  @ManyToOne(() => Product, (product) => product.orderLines,{nullable:false})
  product: Product;
}
