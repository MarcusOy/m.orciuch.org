import { extendTheme, ThemeConfig } from '@chakra-ui/react'

const config: ThemeConfig | any = {
    config: {
        initialColorMode: 'dark',
        useSystemColorMode: false,
        cssVarPrefix: '🗿',
    },
    fonts: {
        heading: 'Gotham',
        body: 'Gotham',
    },
}

const theme = extendTheme(config)

export default theme
