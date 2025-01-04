import {
	PrimaryGeneratedColumn,
	Column,
	Entity,
	CreateDateColumn,
	UpdateDateColumn,
	OneToMany,
	DeleteDateColumn,
} from 'typeorm';

import { Item } from '@item-v1/entities/item.entity';

@Entity('item_types')
export class ItemType {
	@PrimaryGeneratedColumn()
	id: number;

	@Column({ type: 'varchar', length: 80, unique: true })
	name: string;

	@OneToMany(() => Item, item => item.item_type)
	items: Item[];

	@CreateDateColumn({ type: 'timestamp' })
	created_at: Date;

	@UpdateDateColumn({ type: 'timestamp' })
	updated_at: Date;

	@DeleteDateColumn({ type: 'timestamp' })
	deleted_at: Date;
}
