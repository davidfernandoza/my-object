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
import { ItemType } from '@database/entities/item/item-type.entity';
import { History } from '@database/entities/item/history.entity';

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
	@JoinColumn({ name: 'office_id' })
	office: Office; // Relation

	@ManyToOne(() => User, user => user.items, {
		onDelete: 'RESTRICT',
		nullable: false,
	})
	@JoinColumn({ name: 'user_id' })
	user: User; // Relation

	@ManyToOne(() => ItemType, itemType => itemType.items, {
		onDelete: 'RESTRICT',
		nullable: false,
	})
	@JoinColumn({ name: 'item_type_id' })
	item_type: ItemType; // Relation

	@OneToMany(() => History, history => history.item)
	histories: History[]; // Relation

	@CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
	created_at: Date;

	@UpdateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
	updated_at: Date;

	@DeleteDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
	deleted_at: Date;
}
