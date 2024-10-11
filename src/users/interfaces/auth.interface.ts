export interface AuthInterface {
	login(payload: any): Promise<any>;
	register(payload: any): Promise<any>;
	logout(payload: any): Promise<any>;
}
