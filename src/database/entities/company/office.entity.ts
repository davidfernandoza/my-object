import {
	PrimaryGeneratedColumn,
	Column,
	Entity,
	CreateDateColumn,
	UpdateDateColumn,
	OneToMany,
	ManyToOne,
	DeleteDateColumn,
	JoinColumn,
	Index,
} from 'typeorm';

import { Booking } from '@database/entities/company/booking.entity';
import { City } from '@database/entities/common/city.entity';
import { Company } from '@database/entities/company/company.entity';
import { Employeer } from '@database/entities/company/employeer.entity';
import { Item } from '@database/entities/item/item.entity';

@Entity('offices')
export class Office {
	@PrimaryGeneratedColumn()
	id: number;

	@Index()
	@Column({ type: 'varchar', collation: 'utf8mb4_spanish2_ci', length: 200 })
	address: string;

	@Column({ type: 'varchar', collation: 'utf8mb4_spanish2_ci', length: 200, nullable: true })
	map_coordinates: string;

	@Column({ type: 'varchar', collation: 'utf8mb4_spanish2_ci', length: 20, unique: true })
	phone_1: string;

	@Column({ type: 'varchar', collation: 'utf8mb4_spanish2_ci', length: 20, nullable: true })
	phone_2: string;

	@Column({ type: 'varchar', collation: 'utf8mb4_spanish2_ci', length: 120, unique: true })
	email_1: string;

	@Column({ type: 'varchar', collation: 'utf8mb4_spanish2_ci', length: 120, nullable: true })
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
	@JoinColumn({ name: 'city_id' })
	city: City; // Relation

	@ManyToOne(() => Company, company => company.offices, {
		onDelete: 'RESTRICT',
		nullable: false,
	})
	@JoinColumn({ name: 'company_id' })
	company: Company; // Relation

	@Index()
	@CreateDateColumn({ type: 'timestamp' })
	created_at: Date;

	@UpdateDateColumn({ type: 'timestamp' })
	updated_at: Date;

	@Index()
	@DeleteDateColumn({ type: 'timestamp' })
	deleted_at: Date;
}
