import {
	PrimaryGeneratedColumn,
	Column,
	Entity,
	CreateDateColumn,
	UpdateDateColumn,
	ManyToOne,
	OneToMany,
	DeleteDateColumn,
	JoinColumn,
	Index,
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

	@Index()
	@Column({ type: 'varchar', collation: 'utf8mb4_spanish2_ci', length: 120 })
	names: string;

	@Column({ type: 'varchar', collation: 'utf8mb4_spanish2_ci', length: 120 })
	lastNames: string;

	@Index()
	@Column({ type: 'varchar', collation: 'utf8mb4_spanish2_ci', length: 25 })
	identificationNumber: string;

	@Column({ type: 'varchar', collation: 'utf8mb4_spanish2_ci', length: 20, nullable: true })
	phone: string;

	/* -----------------------------------------
	 * Relations
	 */

	@OneToMany(() => Auth, auth => auth.user, { nullable: false }) // one to one relation
	auths: Auth;

	@ManyToOne(() => City, city => city.users, {
		onDelete: 'RESTRICT',
		nullable: false,
	})
	@JoinColumn({ name: 'cityId' })
	city: City; // Relation

	@ManyToOne(() => IdentificationType, identificationType => identificationType.users, {
		onDelete: 'RESTRICT',
		nullable: false,
	})
	@JoinColumn({ name: 'identificationTypeId' })
	identificationType: IdentificationType; // Relation

	@OneToMany(() => Booking, booking => booking.user)
	bookings: Booking[]; // Relation

	@OneToMany(() => Employeer, employeer => employeer.user)
	employeers: Employeer[]; // Relation

	@OneToMany(() => Item, item => item.user)
	items: Item[]; // Relation

	@Index()
	@CreateDateColumn({ type: 'timestamp' })
	createdAt: Date;

	@UpdateDateColumn({ type: 'timestamp' })
	updatedAt: Date;

	@Index()
	@DeleteDateColumn({ type: 'timestamp' })
	deletedAt: Date;
}
