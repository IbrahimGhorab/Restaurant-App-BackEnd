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
import { Category } from "./Category";
import { OrderLine } from "./OrderLine";

@Entity()
export class Product extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  price: number;

  // @Column()
  // image: string;

  @Column({ type: "boolean", default: false })
  isPopular: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => Category, (category) => category.products)
  category: Category;

  @OneToMany(() => OrderLine, (orderLines) => orderLines.product, {
    nullable: true,
  })
  orderLines: OrderLine[];
}
