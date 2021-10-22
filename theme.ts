import { extendTheme, ThemeConfig } from '@chakra-ui/react'

const config: ThemeConfig | any = {
    initialColorMode: 'dark',
    useSystemColorMode: false,
    fonts: {
        heading: 'Gotham',
        body: 'Gotham',
    },
}

const theme = extendTheme(config)

export default theme
