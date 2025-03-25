import {
	PrimaryGeneratedColumn,
	Column,
	Entity,
	CreateDateColumn,
	UpdateDateColumn,
	OneToMany,
	DeleteDateColumn,
	Index,
	BeforeInsert,
	BeforeUpdate,
	ManyToOne,
	JoinColumn,
} from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Exclude } from 'class-transformer';

import { User } from '@database/entities/user/user.entity';
import { AuthToken } from '@database/entities/auth/auth-token.entity';

@Entity('auth') // Table Name
export class Auth {
	@PrimaryGeneratedColumn()
	id: number;

	@Column({ unique: true, type: 'varchar', collation: 'utf8mb4_spanish2_ci', length: 120 })
	email: string;

	@Column({ type: 'varchar', collation: 'utf8mb4_spanish2_ci' })
	@Exclude()
	password: string;

	@Column({ type: 'datetime', nullable: false })
	passwordExpirationDate: Date;

	@Column({ type: 'varchar', nullable: true, collation: 'utf8mb4_spanish2_ci' })
	passwordResetToken: string;

	@Column({ type: 'datetime', nullable: true })
	passwordResetExpiration: Date;

	@Index()
	@Column({ type: 'int', nullable: false, default: 0 })
	loginAttempts: number;

	@Column({ type: 'datetime', nullable: true })
	loginAttemptsExpiration: Date;

	@Column({ type: 'int', nullable: false, default: 0 })
	loginAttemptsCicles: number;

	@Index()
	@Column({ type: 'int', nullable: false, select: false })
	@Exclude()
	verificationEmailToken: number;

	@Column({ type: 'datetime', nullable: true })
	verificationEmailExpirationToken: Date;

	@Column({ type: 'datetime', nullable: true })
	verificationEmailDate: Date;

	@Column({ type: 'boolean', nullable: false, default: false })
	with2FA: boolean;

	@Index()
	@Column({ type: 'varchar', nullable: true, collation: 'utf8mb4_spanish2_ci' })
	secret2FA: string;

	@Column({ type: 'boolean', nullable: false, default: true })
	isActive: boolean;

	/*----------------------------------------
	 * Relations
	 */

	@ManyToOne(() => User, user => user.auths, {
		onDelete: 'RESTRICT',
		nullable: false,
	})
	@JoinColumn({ name: 'userId' })
	user: User; // Relation

	@OneToMany(() => AuthToken, authToke => authToke.auth)
	authTokens: AuthToken[]; // Relation

	@Index()
	@CreateDateColumn({ type: 'timestamp' })
	createdAt: Date;

	@UpdateDateColumn({ type: 'timestamp' })
	updatedAt: Date;

	@Index()
	@DeleteDateColumn({ type: 'timestamp', select: false })
	@Exclude()
	deletedAt: Date;

	// --------------------------------------------

	@BeforeInsert()
	@BeforeUpdate()
	async hashPassword() {
		if (this.password && !this.password.startsWith('$2b$')) {
			const salt = await bcrypt.genSalt(10);
			this.password = await bcrypt.hash(this.password, salt);
		}
	}

	async comparePassword(password: string): Promise<boolean> {
		return bcrypt.compare(password, this.password);
	}
}
