/* eslint-disable camelcase */
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import Car from '@modules/cars/infra/typeorm/entities/Cars';
import Specification from '@modules/specifications/infra/typeorm/entities/Specification';

@Entity('cars_specfications')
export default class CarSpecification {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('uuid')
  car_id: string;

  @Column('uuid')
  specification_id: string;

  @ManyToOne(() => Specification)
  @JoinColumn({ name: 'specification_id' })
  specification: Specification;

  @ManyToOne(() => Car)
  @JoinColumn({ name: 'car_id' })
  car: Specification;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
