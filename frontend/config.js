import dotenv from 'dotenv'

dotenv.config()

const apiEndpoint =
	process.env.NODE_ENV === 'development'
		? 'https://api.starowl.social'
		: 'http://localhost:5000'

export { apiEndpoint }
