const apiEndpoint =
	process.env.NODE_ENV === 'dev'
		? 'https://starowl.social'
		: 'http://localhost:5000'

export { apiEndpoint }
