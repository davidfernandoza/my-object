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

@Entity('authTokens') // Table Name
export class AuthToken {
	@PrimaryGeneratedColumn()
	id: number;

	@Column({ unique: true, type: 'varchar', collation: 'utf8mb4_spanish2_ci', length: 512 })
	token: string;

	@Column({
		type: 'enum',
		enum: [
			'JWT[BlackAccessToken]',
			'JWT[RefreshToken]',
			'Oauth[ApiKey]',
			'Oauth[Token]',
			'2FA[APiKey]',
			'2FA[Token]',
			'VerificationEmail[ApiKey]',
			'VerificationEmail[Token]',
			'passwordReset[ApiKey]',
			'passwordReset[Token]',
		],
	})
	@Index()
	type: string;

	@Column({ type: 'datetime', nullable: true })
	expiration: Date;

	/* ------------------------------------------------
	 * Relations
	 */

	@ManyToOne(() => Auth, auth => auth.authTokens, {
		onDelete: 'RESTRICT',
		nullable: false,
	})
	@JoinColumn({ name: 'authId' })
	auth: Auth; // Relation

	@Index()
	@CreateDateColumn({ type: 'timestamp' })
	createdAt: Date;

	@UpdateDateColumn({ type: 'timestamp' })
	updatedAt: Date;

	@Index()
	@DeleteDateColumn({ type: 'timestamp', select: false })
	@Exclude()
	deletedAt: Date;
}
