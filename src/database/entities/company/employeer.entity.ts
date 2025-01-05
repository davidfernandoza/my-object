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

import { Office } from '@database/entities/company/office.entity';
import { User } from '@database/entities/user/user.entity';
import { History } from '@database/entities/item/history.entity';

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
	@JoinColumn({ name: 'office_id' })
	office: Office; // Relation

	@ManyToOne(() => User, user => user.employeers, {
		onDelete: 'RESTRICT',
		nullable: false,
	})
	@JoinColumn({ name: 'user_id' })
	user: User; // Relation

	@OneToMany(() => History, history => history.employeer)
	histories: History[]; // Relation

	@CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
	created_at: Date;

	@UpdateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
	updated_at: Date;

	@DeleteDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
	deleted_at: Date;
}
