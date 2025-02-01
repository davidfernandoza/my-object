import {
	PrimaryGeneratedColumn,
	Column,
	Entity,
	CreateDateColumn,
	UpdateDateColumn,
	ManyToOne,
	DeleteDateColumn,
	JoinColumn,
	Index,
} from 'typeorm';

import { Item } from '@database/entities/item/item.entity';
import { Employeer } from '@database/entities/company/employeer.entity';

@Entity('histories')
export class History {
	@PrimaryGeneratedColumn()
	id: number;

	@Column({ type: 'text' })
	description: string;

	@Index()
	@Column({
		type: 'enum',
		enum: ['lista de espera', 'proceso', 'finalizado', 'cancelado', 'entregado'],
	})
	status: string;

	@Index()
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

	@Index()
	@CreateDateColumn({ type: 'timestamp' })
	created_at: Date;

	@UpdateDateColumn({ type: 'timestamp' })
	updated_at: Date;

	@Index()
	@DeleteDateColumn({ type: 'timestamp' })
	deleted_at: Date;
}
