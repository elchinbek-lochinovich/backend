import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Department } from '../department/department.entity';

@Entity('groups')
@Index(['departmentId', 'name'], { unique: true })
export class GroupEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  departmentId: number;

  @ManyToOne(() => Department, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'departmentId' })
  department: Department;

  @Column({ type: 'varchar', length: 50 })
  name: string; // 23-IT-1

  @Column({ type: 'int' })
  course: number; // 1..6

  @Column({ type: 'int', nullable: true })
  year?: number | null;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
