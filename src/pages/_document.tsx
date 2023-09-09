import Document, { Head, Html, Main, NextScript } from 'next/document'

class AppDocument extends Document {
    render() {
        return (
            <Html lang='en'>
                <Head>
                    <meta name='format-detection' content='telephone=no, date=no, email=no, address=no' />
                </Head>

                <body className='bg-primary-dark text-white-50 leading-none px-8'>
                    <Main />
                    <NextScript />
                </body>
            </Html>
        )
    }
}

export default AppDocument
