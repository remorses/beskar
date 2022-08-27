import {
    ChakraProvider,
    ColorModeProvider,
    theme as _theme,
} from '@chakra-ui/react'
import colors from '../colors'
import { useColorMode } from './utils'

const theme: typeof _theme = {
    ..._theme,
    components: {
        ..._theme.components,
    },
    colors: {
        ..._theme.colors,
        gray: { ...colors.gray },
    },
    styles: {},
    config: {
        ..._theme.config,
        initialColorMode: 'light',
        useSystemColorMode: false,
    },
}

export function ChakraStuff({ children, forceColorMode = '', ...rest }) {
    let { colorMode } = useColorMode()
    if (forceColorMode) {
        colorMode = forceColorMode
    }

    return (
        <ChakraProvider resetCSS={false} theme={theme}>
            <ColorModeProvider
                options={{
                    initialColorMode: 'light',
                    useSystemColorMode: false,
                }}
                value={colorMode as any}
            >
                {children}
            </ColorModeProvider>
        </ChakraProvider>
    )
}
