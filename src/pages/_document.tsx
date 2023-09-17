import Document, { Head, Html, Main, NextScript } from 'next/document'

class AppDocument extends Document {
	render() {
		return (
			<Html lang='en'>
				<Head>
					<meta
						name='format-detection'
						content='telephone=no, date=no, email=no, address=no'
					/>
				</Head>

				<body className='min-h-screen bg-primary-dark leading-none text-white-50 dark'>
					<Main />
					<NextScript />
				</body>
			</Html>
		)
	}
}

export default AppDocument
