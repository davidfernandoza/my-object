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

import { Office } from '@database/entities/company/office.entity';
import { User } from '@database/entities/user/user.entity';
import { History } from '@database/entities/item/history.entity';

@Entity('employeers')
export class Employeer {
	@PrimaryGeneratedColumn()
	id: number;

	@Index()
	@Column({ type: 'varchar', collation: 'utf8mb4_spanish2_ci', length: 100, nullable: true })
	code: string;

	@Index()
	@Column({ type: 'boolean', default: true })
	status: boolean;

	@ManyToOne(() => Office, office => office.employeers, {
		onDelete: 'RESTRICT',
		nullable: false,
	})
	@JoinColumn({ name: 'officeId' })
	office: Office; // Relation

	@ManyToOne(() => User, user => user.employeers, {
		onDelete: 'RESTRICT',
		nullable: false,
	})
	@JoinColumn({ name: 'userId' })
	user: User; // Relation

	@OneToMany(() => History, history => history.employeer)
	histories: History[]; // Relation

	@Index()
	@CreateDateColumn({ type: 'timestamp' })
	createdAt: Date;

	@UpdateDateColumn({ type: 'timestamp' })
	updatedAt: Date;

	@Index()
	@DeleteDateColumn({ type: 'timestamp' })
	deletedAt: Date;
}
