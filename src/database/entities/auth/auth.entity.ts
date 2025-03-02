import {
	PrimaryGeneratedColumn,
	Column,
	Entity,
	CreateDateColumn,
	UpdateDateColumn,
	OneToOne,
	OneToMany,
	DeleteDateColumn,
	Index,
	BeforeInsert,
	BeforeUpdate,
} from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Exclude } from 'class-transformer';

import { User } from '@database/entities/user/user.entity';
import { JWTBlacklist } from '@database/entities/auth/jwt-blacklist.entity';

@Entity('auth') // Table Name
export class Auth {
	@PrimaryGeneratedColumn()
	id: number;

	@Column({ unique: true, type: 'varchar', collation: 'utf8mb4_spanish2_ci', length: 120 })
	email: string;

	@Column({ type: 'varchar', collation: 'utf8mb4_spanish2_ci' })
	@Exclude()
	password: string;

	@Column({ unique: true, type: 'varchar', collation: 'utf8mb4_spanish2_ci', length: 15 })
	wathsapp: string;

	@Index()
	@Column({ type: 'int', nullable: false, select: false })
	@Exclude()
	code_verification: number;

	@Column({ type: 'datetime', nullable: true })
	verification_date: Date;

	@Column({ type: 'varchar', nullable: true })
	@Exclude()
	refresh_token: string;

	@OneToOne(() => User, user => user.auth) // one to one relation inverse
	user: User; // Relation

	@OneToMany(() => JWTBlacklist, jwtBlacklist => jwtBlacklist.auth)
	tokensInBlackList: JWTBlacklist[]; // Relation

	@Index()
	@CreateDateColumn({ type: 'timestamp' })
	created_at: Date;

	@UpdateDateColumn({ type: 'timestamp' })
	updated_at: Date;

	@Index()
	@DeleteDateColumn({ type: 'timestamp', select: false })
	@Exclude()
	deleted_at: Date;

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
