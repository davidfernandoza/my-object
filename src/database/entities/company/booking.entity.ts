import {
	PrimaryGeneratedColumn,
	Column,
	Entity,
	CreateDateColumn,
	UpdateDateColumn,
	ManyToOne,
	JoinColumn,
	DeleteDateColumn,
	Index,
} from 'typeorm';

import { User } from '@database/entities/user/user.entity';
import { Office } from '@database/entities/company/office.entity';

@Entity('bookings')
export class Booking {
	@PrimaryGeneratedColumn()
	id: number;

	@Index()
	@Column({ type: 'varchar', collation: 'utf8mb4_spanish2_ci', length: 120 })
	title: string;

	@Column({ type: 'text', nullable: true })
	description: string;

	@Column({ type: 'datetime' })
	date_time: Date;

	@Index()
	@Column({ type: 'enum', enum: ['pendiente', 'aprobado', 'cancelado'] })
	status: string;

	@ManyToOne(() => User, user => user.bookings, {
		onDelete: 'RESTRICT',
		nullable: false,
	})
	@JoinColumn({ name: 'user_id' })
	user: User; // Relation

	@ManyToOne(() => Office, office => office.bookings, {
		onDelete: 'RESTRICT',
		nullable: false,
	})
	@JoinColumn({ name: 'office_id' })
	office: Office; // Relation

	@Index()
	@CreateDateColumn({ type: 'timestamp' })
	created_at: Date;

	@UpdateDateColumn({ type: 'timestamp' })
	updated_at: Date;

	@Index()
	@DeleteDateColumn({ type: 'timestamp' })
	deleted_at: Date;
}
