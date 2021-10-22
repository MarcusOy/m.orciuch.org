import { ColorModeScript } from '@chakra-ui/react'
import Document, { Html, Head, Main, NextScript } from 'next/document'
import React from 'react'
import theme from '../theme'

class MyDocument extends Document {
    static async getInitialProps(ctx: any) {
        const initialProps = await Document.getInitialProps(ctx)
        return { ...initialProps }
    }

    render() {
        return (
            <Html>
                <Head />
                <body>
                    <ColorModeScript
                        initialColorMode={theme.config.initialColorMode}
                    />
                    <Main />
                    <NextScript />
                </body>
            </Html>
        )
    }
}

export default MyDocument
