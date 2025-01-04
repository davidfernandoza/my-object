import {
	PrimaryGeneratedColumn,
	Column,
	Entity,
	CreateDateColumn,
	UpdateDateColumn,
	ManyToOne,
	OneToMany,
	DeleteDateColumn,
} from 'typeorm';

import { Department } from '@common/entities/department.entity';
import { User } from '@users-v1/entities/user.entity';
import { Office } from '@companies-v1/entities/office.entity';

@Entity('cities')
export class City {
	@PrimaryGeneratedColumn()
	id: number;

	@ManyToOne(() => Department, department => department.cities, {
		onDelete: 'RESTRICT',
		nullable: false,
	})
	@Column({ name: 'department_id' })
	department: Department; // Relation

	@OneToMany(() => User, user => user.city)
	users: User[]; // Relation

	@OneToMany(() => Office, office => office.city)
	offices: Office[]; // Relation

	@CreateDateColumn({ type: 'timestamp' })
	created_at: Date;

	@UpdateDateColumn({ type: 'timestamp' })
	updated_at: Date;

	@DeleteDateColumn({ type: 'timestamp' })
	deleted_at: Date;
}
