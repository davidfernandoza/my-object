import {
	PrimaryGeneratedColumn,
	Column,
	Entity,
	CreateDateColumn,
	UpdateDateColumn,
	JoinColumn,
	ManyToOne,
	DeleteDateColumn,
	Index,
} from 'typeorm';
import { Exclude } from 'class-transformer';

import { Auth } from '@database/entities/auth/auth.entity';

@Entity('jwt_blacklist') // Table Name
export class JWTBlacklist {
	@PrimaryGeneratedColumn()
	id: number;

	@Column({ unique: true, type: 'varchar', collation: 'utf8mb4_spanish2_ci', length: 512 })
	token: string;

	@ManyToOne(() => Auth, auth => auth.tokensInBlackList, {
		onDelete: 'RESTRICT',
		nullable: false,
	})
	@JoinColumn({ name: 'auth_id' })
	auth: Auth; // Relation

	@Index()
	@CreateDateColumn({ type: 'timestamp' })
	created_at: Date;

	@UpdateDateColumn({ type: 'timestamp' })
	updated_at: Date;

	@Index()
	@DeleteDateColumn({ type: 'timestamp', select: false })
	@Exclude()
	deleted_at: Date;
}
