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
	JoinColumn,
} from 'typeorm';

import { Auth } from '@database/entities/auth/auth.entity';
import { City } from '@database/entities/common/city.entity';
import { IdentificationType } from '@database/entities/user/identification-type.entity';
import { Booking } from '@database/entities/company/booking.entity';
import { Employeer } from '@database/entities/company/employeer.entity';
import { Item } from '@database/entities/item/item.entity';

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
	@JoinColumn({ name: 'city_id' })
	city: City; // Relation

	@ManyToOne(() => IdentificationType, identificationType => identificationType.users, {
		onDelete: 'RESTRICT',
		nullable: false,
	})
	@JoinColumn({ name: 'identification_type_id' })
	identificationType: IdentificationType; // Relation

	@OneToMany(() => Booking, booking => booking.user)
	bookings: Booking[]; // Relation

	@OneToMany(() => Employeer, employeer => employeer.user)
	employeers: Employeer[]; // Relation

	@OneToMany(() => Item, item => item.user)
	items: Item[]; // Relation

	@CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
	created_at: Date;

	@UpdateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
	updated_at: Date;

	@DeleteDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
	deleted_at: Date;
}
