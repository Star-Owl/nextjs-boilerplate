const apiEndpoint =
	process.env.NODE_ENV === 'dev'
		? 'https://api.starowl.social'
		: 'http://localhost:5000'

export { apiEndpoint }
