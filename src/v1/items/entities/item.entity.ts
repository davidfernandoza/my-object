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
import { ItemType } from '@item-v1/entities/item-type.entity';
import { History } from '@item-v1/entities/history.entity';

@Entity('items')
export class Item {
	@PrimaryGeneratedColumn()
	id: number;

	@Column({ type: 'varchar', length: 150 })
	name: string;

	@Column({ type: 'varchar', length: 50, nullable: true })
	identification: string;

	@Column({ type: 'text', nullable: true })
	description: string;

	@ManyToOne(() => Office, office => office.items, {
		onDelete: 'RESTRICT',
		nullable: false,
	})
	@Column({ name: 'office_id' })
	office: Office; // Relation

	@ManyToOne(() => User, user => user.items, {
		onDelete: 'RESTRICT',
		nullable: false,
	})
	@Column({ name: 'user_id' })
	user: User; // Relation

	@ManyToOne(() => ItemType, itemType => itemType.items, {
		onDelete: 'RESTRICT',
		nullable: false,
	})
	@Column({ name: 'item_type_id' })
	item_type: ItemType; // Relation

	@OneToMany(() => History, history => history.item)
	histories: History[]; // Relation

	@CreateDateColumn({ type: 'timestamp' })
	created_at: Date;

	@UpdateDateColumn({ type: 'timestamp' })
	updated_at: Date;

	@DeleteDateColumn({ type: 'timestamp' })
	deleted_at: Date;
}
