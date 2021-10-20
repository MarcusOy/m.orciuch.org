import '../styles/globals.css'
import '../public/fonts/fonts.css'
import '../styles/bokeh.scss' // used by BokehBackground.tsx
import type { AppProps } from 'next/app'
import React from 'react'
import { ChakraProvider } from '@chakra-ui/react'
import theme from '../theme'

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <ChakraProvider theme={theme}>
            <Component {...pageProps} />
        </ChakraProvider>
    )
}
export default MyApp
