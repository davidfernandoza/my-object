import {
	PrimaryGeneratedColumn,
	Column,
	Entity,
	CreateDateColumn,
	UpdateDateColumn,
	OneToMany,
	ManyToOne,
	DeleteDateColumn,
} from 'typeorm';

import { Booking } from '@companies-v1/entities/booking.entity';
import { City } from '@common/entities/city.entity';
import { Company } from '@companies-v1/entities/company.entity';
import { Employeer } from '@companies-v1/entities/employeer.entity';
import { Item } from '@item-v1/entities/item.entity';

@Entity('offices')
export class Office {
	@PrimaryGeneratedColumn()
	id: number;

	@Column({ type: 'varchar', length: 200 })
	address: string;

	@Column({ type: 'varchar', length: 200, nullable: true })
	map_coordinates: string;

	@Column({ type: 'varchar', length: 20, unique: true })
	phone_1: string;

	@Column({ type: 'varchar', length: 20, nullable: true })
	phone_2: string;

	@Column({ type: 'varchar', length: 120, unique: true })
	email_1: string;

	@Column({ type: 'varchar', length: 120, nullable: true })
	email_2: string;

	@OneToMany(() => Booking, booking => booking.office)
	bookings: Booking[]; // Relation

	@OneToMany(() => Employeer, employeer => employeer.office)
	employeers: Employeer[]; // Relation

	@OneToMany(() => Item, item => item.office)
	items: Item[]; // Relation

	@ManyToOne(() => City, city => city.offices, {
		onDelete: 'RESTRICT',
		nullable: false,
	})
	@Column({ name: 'city_id' })
	city: City; // Relation

	@ManyToOne(() => Company, company => company.offices, {
		onDelete: 'RESTRICT',
		nullable: false,
	})
	@Column({ name: 'company_id' })
	company: Company; // Relation

	@CreateDateColumn({ type: 'timestamp' })
	created_at: Date;

	@UpdateDateColumn({ type: 'timestamp' })
	updated_at: Date;

	@DeleteDateColumn({ type: 'timestamp' })
	deleted_at: Date;
}
