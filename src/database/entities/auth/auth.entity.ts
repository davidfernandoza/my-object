import {
	PrimaryGeneratedColumn,
	Column,
	Entity,
	CreateDateColumn,
	UpdateDateColumn,
	OneToOne,
	JoinColumn,
	DeleteDateColumn,
} from 'typeorm';

import { User } from '@database/entities/user/user.entity';

@Entity('auth') // Table Name
export class Auth {
	@PrimaryGeneratedColumn()
	id: number;

	@Column({ unique: true, type: 'varchar', length: 120 })
	email: string;

	@Column({ type: 'varchar' })
	password: string;

	@Column({ unique: true, type: 'varchar', length: 15 })
	wathsapp: string;

	@Column({ type: 'datetime' })
	verification_date: Date;

	@OneToOne(() => User, user => user.auth, { nullable: false }) // one to one relation
	@JoinColumn({ name: 'user_id' })
	user: User;

	@CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
	created_at: Date;

	@UpdateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
	updated_at: Date;

	@DeleteDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
	deleted_at: Date;
}
