import {
	PrimaryGeneratedColumn,
	Column,
	Entity,
	CreateDateColumn,
	UpdateDateColumn,
	OneToMany,
	DeleteDateColumn,
} from 'typeorm';

import { City } from '@database/entities/common/city.entity';

@Entity('departments')
export class Department {
	@PrimaryGeneratedColumn()
	id: number;

	@Column({ unique: true, type: 'varchar', length: 60 })
	name: string;

	@OneToMany(() => City, city => city.department)
	cities: City[]; // Relation

	@CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
	created_at: Date;

	@UpdateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
	updated_at: Date;

	@DeleteDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
	deleted_at: Date;
}
