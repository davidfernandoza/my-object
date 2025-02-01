import {
	PrimaryGeneratedColumn,
	Column,
	Entity,
	CreateDateColumn,
	UpdateDateColumn,
	OneToMany,
	DeleteDateColumn,
	Index,
} from 'typeorm';

import { Office } from '@database/entities/company/office.entity';

@Entity('companies')
export class Company {
	@PrimaryGeneratedColumn()
	id: number;

	@Column({ type: 'varchar', collation: 'utf8mb4_spanish2_ci', length: 15, unique: true })
	nit: string;

	@Column({ type: 'varchar', collation: 'utf8mb4_spanish2_ci', length: 150, unique: true })
	name: string;

	@OneToMany(() => Office, office => office.company)
	offices: Office[]; // Relation

	@Index()
	@CreateDateColumn({ type: 'timestamp' })
	created_at: Date;

	@UpdateDateColumn({ type: 'timestamp' })
	updated_at: Date;

	@Index()
	@DeleteDateColumn({ type: 'timestamp' })
	deleted_at: Date;
}
