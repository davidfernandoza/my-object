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
} from 'typeorm';

import { Department } from '@database/entities/common/department.entity';
import { User } from '@database/entities/user/user.entity';
import { Office } from '@database/entities/company/office.entity';

@Entity('cities')
export class City {
	@PrimaryGeneratedColumn()
	id: number;

	@Column({ type: 'varchar', length: 60, unique: true })
	name: string;

	@ManyToOne(() => Department, department => department.cities, {
		onDelete: 'RESTRICT',
		nullable: false,
	})
	@JoinColumn({ name: 'department_id' })
	department: Department; // Relation

	@OneToMany(() => User, user => user.city)
	users: User[]; // Relation

	@OneToMany(() => Office, office => office.city)
	offices: Office[]; // Relation

	@CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
	created_at: Date;

	@UpdateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
	updated_at: Date;

	@DeleteDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
	deleted_at: Date;
}
