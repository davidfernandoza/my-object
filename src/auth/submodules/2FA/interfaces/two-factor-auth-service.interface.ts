export interface ITwoFactorAuthService {
	changeActivation(body: any): Promise<void>;
	validateCode(body: any): Promise<boolean>;
}
