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

@Entity('itemTypes')
export class ItemType {
	@PrimaryGeneratedColumn()
	id: number;

	@Column({ type: 'varchar', collation: 'utf8mb4_spanish2_ci', length: 80, unique: true })
	name: string;

	@OneToMany(() => Item, item => item.itemType)
	items: Item[];

	@Index()
	@CreateDateColumn({ type: 'timestamp' })
	createdAt: Date;

	@UpdateDateColumn({ type: 'timestamp' })
	updatedAt: Date;

	@Index()
	@DeleteDateColumn({ type: 'timestamp' })
	deletedAt: Date;
}
