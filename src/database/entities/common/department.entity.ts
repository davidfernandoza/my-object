import {
	PrimaryGeneratedColumn,
	Column,
	Entity,
	CreateDateColumn,
	UpdateDateColumn,
	OneToMany,
	DeleteDateColumn,
	Index,
} from 'typeorm';

import { City } from '@database/entities/common/city.entity';

@Entity('departments')
export class Department {
	@PrimaryGeneratedColumn()
	id: number;

	@Column({ unique: true, type: 'varchar', collation: 'utf8mb4_spanish2_ci', length: 100 })
	name: string;

	@OneToMany(() => City, city => city.department)
	cities: City[]; // Relation

	@Index()
	@CreateDateColumn({ type: 'timestamp' })
	createdAt: Date;

	@UpdateDateColumn({ type: 'timestamp' })
	updatedAt: Date;

	@Index()
	@DeleteDateColumn({ type: 'timestamp' })
	deletedAt: Date;
}
