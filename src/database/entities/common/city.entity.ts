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

import { Department } from '@database/entities/common/department.entity';
import { User } from '@database/entities/user/user.entity';
import { Office } from '@database/entities/company/office.entity';

@Entity('cities')
export class City {
	@PrimaryGeneratedColumn()
	id: number;

	@Column({ type: 'varchar', collation: 'utf8mb4_spanish2_ci', length: 60, unique: true })
	name: string;

	@ManyToOne(() => Department, department => department.cities, {
		onDelete: 'RESTRICT',
		nullable: false,
	})
	@JoinColumn({ name: 'departmentId' })
	department: Department; // Relation

	@OneToMany(() => User, user => user.city)
	users: User[]; // Relation

	@OneToMany(() => Office, office => office.city)
	offices: Office[]; // Relation

	@Index()
	@CreateDateColumn({ type: 'timestamp' })
	createdAt: Date;

	@UpdateDateColumn({ type: 'timestamp' })
	updatedAt: Date;

	@Index()
	@DeleteDateColumn({ type: 'timestamp' })
	deletedAt: Date;
}
