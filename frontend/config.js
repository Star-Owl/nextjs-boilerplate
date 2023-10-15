const apiEndpoint =
	process.env.NODE_ENV === 'pro'
		? 'http://localhost:5000'
		: 'https://starowl.social'

export { apiEndpoint }
