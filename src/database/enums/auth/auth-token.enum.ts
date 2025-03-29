export enum TokenType {
	JWTBlackAccessToken = 'JWT[BlackAccessToken]',
	JWTRefreshToken = 'JWT[RefreshToken]',
	OauthRefreshToken = 'Oauth[RefreshToken]',
	OauthAccessToken = 'Oauth[AccessToken]',
	TwoFAApiKey = '2FA[APiKey]',
	TwoFAToken = '2FA[Token]',
	VerificationEmailApiKey = 'VerificationEmail[ApiKey]',
	VerificationEmailToken = 'VerificationEmail[Token]',
	PasswordResetApiKey = 'passwordReset[ApiKey]',
	PasswordResetToken = 'passwordReset[Token]',
}
