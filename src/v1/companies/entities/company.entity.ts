import {
	PrimaryGeneratedColumn,
	Column,
	Entity,
	CreateDateColumn,
	UpdateDateColumn,
	OneToMany,
	DeleteDateColumn,
} from 'typeorm';

import { Office } from '@companies-v1/entities/office.entity';

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

	@CreateDateColumn({ type: 'timestamp' })
	created_at: Date;

	@UpdateDateColumn({ type: 'timestamp' })
	updated_at: Date;

	@DeleteDateColumn({ type: 'timestamp' })
	deleted_at: Date;
}
