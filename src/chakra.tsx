import {
    ChakraProvider,
    ColorModeProvider,
    theme as _theme,
} from '@chakra-ui/react'
import tailwindColors from 'tailwindcss/colors'
import { useColorMode } from './utils'

const theme: typeof _theme = {
    ..._theme,
    components: {
        ..._theme.components,
    },
    colors: {
        ..._theme.colors,
        gray: {
            ...tailwindColors.neutral,
            700: tailwindColors.neutral['800'],
        } as any,
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
