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
                <script
                    id="clearbit"
                    dangerouslySetInnerHTML={{
                        __html: `
                        (function (d, u, h, s) {
                            h = d.getElementsByTagName('head')[0];
                            s = d.createElement('script');
                            s.async = 1;
                            s.src = u + new Date().getTime();
                            h.appendChild(s);
                        })(document, 'https://grow.clearbitjs.com/api/pixel.js?v=');
                    `,
                    }}
                />
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
