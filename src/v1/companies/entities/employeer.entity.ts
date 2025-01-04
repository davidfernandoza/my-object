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

import { Office } from '@companies-v1/entities/office.entity';
import { User } from '@users-v1/entities/user.entity';
import { History } from '@item-v1/entities/history.entity';

@Entity('employeers')
export class Employeer {
	@PrimaryGeneratedColumn()
	id: number;

	@Column({ type: 'varchar', length: 100, nullable: true })
	code: string;

	@Column({ type: 'boolean', default: true })
	status: boolean;

	@ManyToOne(() => Office, office => office.employeers, {
		onDelete: 'RESTRICT',
		nullable: false,
	})
	@Column({ name: 'office_id' })
	office: Office; // Relation

	@ManyToOne(() => User, user => user.employeers, {
		onDelete: 'RESTRICT',
		nullable: false,
	})
	@Column({ name: 'user_id' })
	user: User; // Relation

	@OneToMany(() => History, history => history.employeer)
	histories: History[]; // Relation

	@CreateDateColumn({ type: 'timestamp' })
	created_at: Date;

	@UpdateDateColumn({ type: 'timestamp' })
	updated_at: Date;

	@DeleteDateColumn({ type: 'timestamp' })
	deleted_at: Date;
}
