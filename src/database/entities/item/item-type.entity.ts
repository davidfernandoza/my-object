import {
	PrimaryGeneratedColumn,
	Column,
	Entity,
	CreateDateColumn,
	UpdateDateColumn,
	OneToMany,
	DeleteDateColumn,
} from 'typeorm';

import { Item } from '@database/entities/item/item.entity';

@Entity('item_types')
export class ItemType {
	@PrimaryGeneratedColumn()
	id: number;

	@Column({ type: 'varchar', length: 80, unique: true })
	name: string;

	@OneToMany(() => Item, item => item.item_type)
	items: Item[];

	@CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
	created_at: Date;

	@UpdateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
	updated_at: Date;

	@DeleteDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
	deleted_at: Date;
}
