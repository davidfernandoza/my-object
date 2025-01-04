import {
	PrimaryGeneratedColumn,
	Column,
	Entity,
	CreateDateColumn,
	UpdateDateColumn,
	OneToMany,
	DeleteDateColumn,
} from 'typeorm';

import { User } from '@users-v1/entities/user.entity';

@Entity('identification_types')
export class IdentificationType {
	@PrimaryGeneratedColumn()
	id: number;

	@Column({ type: 'varchar', length: 30 })
	name: string;

	@OneToMany(() => User, user => user.identificationType)
	users: User[]; // Relation

	@CreateDateColumn({ type: 'timestamp' })
	created_at: Date;

	@UpdateDateColumn({ type: 'timestamp' })
	updated_at: Date;

	@DeleteDateColumn({ type: 'timestamp' })
	deleted_at: Date;
}
