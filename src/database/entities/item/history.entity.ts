import {
	PrimaryGeneratedColumn,
	Column,
	Entity,
	CreateDateColumn,
	UpdateDateColumn,
	ManyToOne,
	DeleteDateColumn,
	JoinColumn,
} from 'typeorm';

import { Item } from '@database/entities/item/item.entity';
import { Employeer } from '@database/entities/company/employeer.entity';

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
	@JoinColumn({ name: 'item_id' })
	item: Item; // Relation

	@ManyToOne(() => Employeer, employeer => employeer.histories, {
		onDelete: 'RESTRICT',
		nullable: false,
	})
	@JoinColumn({ name: 'employeer_id' })
	employeer: Employeer; // Relation

	@CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
	created_at: Date;

	@UpdateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
	updated_at: Date;

	@DeleteDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
	deleted_at: Date;
}
