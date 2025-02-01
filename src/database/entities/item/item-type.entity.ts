import {
	PrimaryGeneratedColumn,
	Column,
	Entity,
	CreateDateColumn,
	UpdateDateColumn,
	OneToMany,
	DeleteDateColumn,
	Index,
} from 'typeorm';

import { Item } from '@database/entities/item/item.entity';

@Entity('item_types')
export class ItemType {
	@PrimaryGeneratedColumn()
	id: number;

	@Column({ type: 'varchar', collation: 'utf8mb4_spanish2_ci', length: 80, unique: true })
	name: string;

	@OneToMany(() => Item, item => item.item_type)
	items: Item[];

	@Index()
	@CreateDateColumn({ type: 'timestamp' })
	created_at: Date;

	@UpdateDateColumn({ type: 'timestamp' })
	updated_at: Date;

	@Index()
	@DeleteDateColumn({ type: 'timestamp' })
	deleted_at: Date;
}
