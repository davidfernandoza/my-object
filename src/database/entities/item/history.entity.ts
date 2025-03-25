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
	lastDate: Date;

	@ManyToOne(() => Item, item => item.histories, {
		onDelete: 'RESTRICT',
		nullable: false,
	})
	@JoinColumn({ name: 'itemId' })
	item: Item; // Relation

	@ManyToOne(() => Employeer, employeer => employeer.histories, {
		onDelete: 'RESTRICT',
		nullable: false,
	})
	@JoinColumn({ name: 'employeerId' })
	employeer: Employeer; // Relation

	@Index()
	@CreateDateColumn({ type: 'timestamp' })
	createdAt: Date;

	@UpdateDateColumn({ type: 'timestamp' })
	updatedAt: Date;

	@Index()
	@DeleteDateColumn({ type: 'timestamp' })
	deletedAt: Date;
}
