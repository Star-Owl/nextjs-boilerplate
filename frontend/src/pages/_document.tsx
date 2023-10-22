import Aside from '@/components/organism/navigation/aside'
import Nav from '@/components/organism/navigation/nav'
import NavMobile from '@/components/organism/navigation/nav-mobile'
import Document, {
	DocumentContext,
	Head,
	Html,
	Main,
	NextScript,
} from 'next/document'

type Props = {
	deviceInfo: {
		deviceType: string
		os: string
		browser: string
	}
}

class AppDocument extends Document<Props> {
	static async getInitialProps(ctx: DocumentContext) {
		const initialProps = await Document.getInitialProps(ctx)

		return {
			...initialProps,
			pathname: ctx.pathname,
		}
	}

	render(): JSX.Element {
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
