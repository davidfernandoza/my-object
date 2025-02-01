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

import { User } from '@database/entities/user/user.entity';

@Entity('identification_types')
export class IdentificationType {
	@PrimaryGeneratedColumn()
	id: number;

	@Index()
	@Column({ type: 'varchar', collation: 'utf8mb4_spanish2_ci', length: 30 })
	name: string;

	@OneToMany(() => User, user => user.identificationType)
	users: User[]; // Relation

	@Index()
	@CreateDateColumn({ type: 'timestamp' })
	created_at: Date;

	@UpdateDateColumn({ type: 'timestamp' })
	updated_at: Date;

	@Index()
	@DeleteDateColumn({ type: 'timestamp' })
	deleted_at: Date;
}
