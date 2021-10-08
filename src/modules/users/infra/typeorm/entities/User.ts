/* eslint-disable camelcase */
import { Exclude, Expose } from 'class-transformer';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('users')
export default class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar', { nullable: false, length: 255 })
  name: string;

  @Column('varchar', { nullable: false, length: 255 })
  profile_image: string;

  @Column('varchar', { nullable: false, length: 255, unique: true })
  email: string;

  @Column('varchar', { nullable: false, length: 255 })
  @Exclude()
  password: string;

  @Column('boolean', { nullable: true, default: 'true' })
  @Exclude()
  admin?: boolean;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @Expose({ name: 'profile_image_url' })
  getProfileImageUrl(): string {
    const apiUrl = process.env.API_URL;

    return `${apiUrl}/files/${this.profile_image}`;
  }
}
