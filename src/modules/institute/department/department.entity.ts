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
import { Faculty } from '../faculty/faculty.entity';

@Entity('departments')
@Index(['facultyId', 'name'], { unique: true })
export class Department {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  facultyId: number;

  @ManyToOne(() => Faculty, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'facultyId' })
  faculty: Faculty;

  @Column({ type: 'varchar', length: 150 })
  name: string;

  @Column({ type: 'text', nullable: true })
  description?: string | null;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
