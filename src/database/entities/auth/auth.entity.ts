import {
	PrimaryGeneratedColumn,
	Column,
	Entity,
	CreateDateColumn,
	UpdateDateColumn,
	OneToOne,
	DeleteDateColumn,
	Index,
} from 'typeorm';

import { User } from '@database/entities/user/user.entity';

@Entity('auth') // Table Name
export class Auth {
	@PrimaryGeneratedColumn()
	id: number;

	@Column({ unique: true, type: 'varchar', collation: 'utf8mb4_spanish2_ci', length: 120 })
	email: string;

	@Column({ type: 'varchar', collation: 'utf8mb4_spanish2_ci' })
	password: string;

	@Column({ unique: true, type: 'varchar', collation: 'utf8mb4_spanish2_ci', length: 15 })
	wathsapp: string;

	@Index()
	@Column({ type: 'int', nullable: false })
	code_verification: number;

	@Column({ type: 'datetime', nullable: true })
	verification_date: Date;

	@OneToOne(() => User, user => user.auth) // one to one relation inverse
	user: User; // Relation

	@Index()
	@CreateDateColumn({ type: 'timestamp' })
	created_at: Date;

	@UpdateDateColumn({ type: 'timestamp' })
	updated_at: Date;

	@Index()
	@DeleteDateColumn({ type: 'timestamp' })
	deleted_at: Date;
}
