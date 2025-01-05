import {
	PrimaryGeneratedColumn,
	Column,
	Entity,
	CreateDateColumn,
	UpdateDateColumn,
	OneToMany,
	DeleteDateColumn,
} from 'typeorm';

import { Office } from '@database/entities/company/office.entity';

@Entity('companies')
export class Company {
	@PrimaryGeneratedColumn()
	id: number;

	@Column({ type: 'varchar', length: 15, unique: true })
	nit: string;

	@Column({ type: 'varchar', length: 150, unique: true })
	name: string;

	@OneToMany(() => Office, office => office.company)
	offices: Office[]; // Relation

	@CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
	created_at: Date;

	@UpdateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
	updated_at: Date;

	@DeleteDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
	deleted_at: Date;
}
