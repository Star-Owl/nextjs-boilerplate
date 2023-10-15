const apiEndpoint =
	process.env.NODE_ENV === 'pro'
		? 'http://localhost:5000'
		: 'https://api.starowl.social'

export { apiEndpoint }
