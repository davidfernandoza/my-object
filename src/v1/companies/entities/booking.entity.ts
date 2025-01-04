import {
	PrimaryGeneratedColumn,
	Column,
	Entity,
	CreateDateColumn,
	UpdateDateColumn,
	ManyToOne,
	DeleteDateColumn,
} from 'typeorm';

import { User } from '@users-v1/entities/user.entity';
import { Office } from '@companies-v1/entities/office.entity';

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
	@Column({ name: 'user_id' })
	user: User; // Relation

	@ManyToOne(() => Office, office => office.bookings, {
		onDelete: 'RESTRICT',
		nullable: false,
	})
	@Column({ name: 'office_id' })
	office: Office; // Relation

	@CreateDateColumn({ type: 'timestamp' })
	created_at: Date;

	@UpdateDateColumn({ type: 'timestamp' })
	updated_at: Date;

	@DeleteDateColumn({ type: 'timestamp' })
	deleted_at: Date;
}
