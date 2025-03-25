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
import { ItemType } from '@database/entities/item/item-type.entity';
import { History } from '@database/entities/item/history.entity';

@Entity('items')
export class Item {
	@PrimaryGeneratedColumn()
	id: number;

	@Index()
	@Column({ type: 'varchar', collation: 'utf8mb4_spanish2_ci', length: 150 })
	name: string;

	@Index()
	@Column({ type: 'varchar', collation: 'utf8mb4_spanish2_ci', length: 50, nullable: true })
	identification: string;

	@Column({ type: 'text', nullable: true })
	description: string;

	@ManyToOne(() => Office, office => office.items, {
		onDelete: 'RESTRICT',
		nullable: false,
	})
	@JoinColumn({ name: 'officeId' })
	office: Office; // Relation

	@ManyToOne(() => User, user => user.items, {
		onDelete: 'RESTRICT',
		nullable: false,
	})
	@JoinColumn({ name: 'userId' })
	user: User; // Relation

	@ManyToOne(() => ItemType, itemType => itemType.items, {
		onDelete: 'RESTRICT',
		nullable: false,
	})
	@JoinColumn({ name: 'itemTypeId' })
	itemType: ItemType; // Relation

	@OneToMany(() => History, history => history.item)
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
