import {
	PrimaryGeneratedColumn,
	Column,
	Entity,
	CreateDateColumn,
	UpdateDateColumn,
	OneToMany,
	DeleteDateColumn,
} from 'typeorm';
import { City } from '@common/entities/city.entity';

@Entity('departments')
export class Department {
	@PrimaryGeneratedColumn()
	id: number;

	@Column({ unique: true, type: 'varchar', length: 100 })
	name: string;

	@OneToMany(() => City, city => city.department)
	cities: City[]; // Relation

	@CreateDateColumn({ type: 'timestamp' })
	created_at: Date;

	@UpdateDateColumn({ type: 'timestamp' })
	updated_at: Date;

	@DeleteDateColumn({ type: 'timestamp' })
	deleted_at: Date;
}
