import {
	PrimaryGeneratedColumn,
	Column,
	Entity,
	CreateDateColumn,
	UpdateDateColumn,
	ManyToOne,
	DeleteDateColumn,
} from 'typeorm';

import { Item } from '@item-v1/entities/item.entity';
import { Employeer } from '@companies-v1/entities/employeer.entity';

@Entity('histories')
export class History {
	@PrimaryGeneratedColumn()
	id: number;

	@Column({ type: 'text' })
	description: string;

	@Column({
		type: 'enum',
		enum: ['lista de espera', 'proceso', 'finalizado', 'cancelado', 'entregado'],
	})
	status: string;

	@Column({ type: 'datetime' })
	last_date: Date;

	@ManyToOne(() => Item, item => item.histories, {
		onDelete: 'RESTRICT',
		nullable: false,
	})
	@Column({ name: 'item_id' })
	item: Item; // Relation

	@ManyToOne(() => Employeer, employeer => employeer.histories, {
		onDelete: 'RESTRICT',
		nullable: false,
	})
	@Column({ name: 'employeer_id' })
	employeer: Employeer; // Relation

	@CreateDateColumn({ type: 'timestamp' })
	created_at: Date;

	@UpdateDateColumn({ type: 'timestamp' })
	updated_at: Date;

	@DeleteDateColumn({ type: 'timestamp' })
	deleted_at: Date;
}
