const apiEndpoint =
	process.env.NODE_ENV === 'pro'
		? 'https://api.starowl.social'
		: 'http://localhost:5000'

export { apiEndpoint }
