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
	last_names: string;

	@Index()
	@Column({ type: 'varchar', collation: 'utf8mb4_spanish2_ci', length: 25 })
	identification_number: string;

	@Column({ type: 'varchar', collation: 'utf8mb4_spanish2_ci', length: 20, nullable: true })
	phone: string;

	@OneToOne(() => Auth, auth => auth.user, { nullable: false }) // one to one relation
	@JoinColumn({ name: 'auth_id' })
	auth: Auth;

	@Column({ unique: true, name: 'auth_id' }) // Clave foránea única
	auth_id: number;

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

	@Index()
	@CreateDateColumn({ type: 'timestamp' })
	created_at: Date;

	@UpdateDateColumn({ type: 'timestamp' })
	updated_at: Date;

	@Index()
	@DeleteDateColumn({ type: 'timestamp' })
	deleted_at: Date;
}
