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
import { User } from '@users-v1/entities/user.entity';

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

	@CreateDateColumn({ type: 'timestamp' })
	created_at: Date;

	@UpdateDateColumn({ type: 'timestamp' })
	updated_at: Date;

	@DeleteDateColumn({ type: 'timestamp' })
	deleted_at: Date;
}
