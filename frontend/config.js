const apiEndpoint =
	process.env.NODE_ENV === 'pro'
		? 'https://starowl.social'
		: 'http://localhost:5000'

export { apiEndpoint }
