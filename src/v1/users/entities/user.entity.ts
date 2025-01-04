import {
	PrimaryGeneratedColumn,
	Column,
	Entity,
	CreateDateColumn,
	UpdateDateColumn,
	OneToOne,
	ManyToOne,
	OneToMany,
	DeleteDateColumn,
} from 'typeorm';

import { Auth } from '@auth/entities/auth.entity';
import { City } from '@common/entities/city.entity';
import { IdentificationType } from '@users-v1/entities/identification-type.entity';
import { Booking } from '@companies-v1/entities/booking.entity';
import { Employeer } from '@companies-v1/entities/employeer.entity';
import { Item } from '@item-v1/entities/item.entity';

@Entity('users')
export class User {
	@PrimaryGeneratedColumn()
	id: number;

	@Column({ type: 'varchar', length: 120 })
	names: string;

	@Column({ type: 'varchar', length: 120 })
	last_names: string;

	@Column({ type: 'varchar', length: 25 })
	identification_number: string;

	@Column({ type: 'varchar', length: 20, nullable: true })
	phone: string;

	@OneToOne(() => Auth, auth => auth.user) // one to one relation inverse
	auth: Auth; // Relation

	@ManyToOne(() => City, city => city.users, {
		onDelete: 'RESTRICT',
		nullable: false,
	})
	@Column({ name: 'city_id' })
	city: City; // Relation

	@ManyToOne(() => IdentificationType, identificationType => identificationType.users, {
		onDelete: 'RESTRICT',
		nullable: false,
	})
	@Column({ name: 'identification_type_id', nullable: false })
	identificationType: IdentificationType; // Relation

	@OneToMany(() => Booking, booking => booking.user)
	bookings: Booking[]; // Relation

	@OneToMany(() => Employeer, employeer => employeer.user)
	employeers: Employeer[]; // Relation

	@OneToMany(() => Item, item => item.user)
	items: Item[]; // Relation

	@CreateDateColumn({ type: 'timestamp' })
	created_at: Date;

	@UpdateDateColumn({ type: 'timestamp' })
	updated_at: Date;

	@DeleteDateColumn({ type: 'timestamp' })
	deleted_at: Date;
}
