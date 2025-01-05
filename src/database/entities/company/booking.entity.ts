import {
	PrimaryGeneratedColumn,
	Column,
	Entity,
	CreateDateColumn,
	UpdateDateColumn,
	ManyToOne,
	JoinColumn,
	DeleteDateColumn,
} from 'typeorm';

import { User } from '@database/entities/user/user.entity';
import { Office } from '@database/entities/company/office.entity';

@Entity('bookings')
export class Booking {
	@PrimaryGeneratedColumn()
	id: number;

	@Column({ type: 'varchar', length: 120 })
	title: string;

	@Column({ type: 'text', nullable: true })
	description: string;

	@Column({ type: 'datetime' })
	date_time: Date;

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

	@CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
	created_at: Date;

	@UpdateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
	updated_at: Date;

	@DeleteDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
	deleted_at: Date;
}
