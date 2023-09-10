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

				<body className='bg-primary-dark px-6 leading-none text-white-50'>
					<Main />
					<NextScript />
				</body>
			</Html>
		)
	}
}

export default AppDocument
