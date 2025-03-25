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
	mapCoordinates: string;

	@Column({ type: 'varchar', collation: 'utf8mb4_spanish2_ci', length: 20, unique: true })
	phone1: string;

	@Column({ type: 'varchar', collation: 'utf8mb4_spanish2_ci', length: 20, nullable: true })
	phone2: string;

	@Column({ type: 'varchar', collation: 'utf8mb4_spanish2_ci', length: 120, unique: true })
	email1: string;

	@Column({ type: 'varchar', collation: 'utf8mb4_spanish2_ci', length: 120, nullable: true })
	email2: string;

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
	@JoinColumn({ name: 'companyId' })
	company: Company; // Relation

	@Index()
	@CreateDateColumn({ type: 'timestamp' })
	createdAt: Date;

	@UpdateDateColumn({ type: 'timestamp' })
	updatedAt: Date;

	@Index()
	@DeleteDateColumn({ type: 'timestamp' })
	deletedAt: Date;
}
