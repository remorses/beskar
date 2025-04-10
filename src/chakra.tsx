import {
    ChakraProvider,
    ColorModeProvider,
    DarkMode,
    theme as _theme,
} from '@chakra-ui/react'
import colors from '../colors'
import { useColorMode } from './utils'
import { useRef } from 'react'

const theme: typeof _theme = {
    ..._theme,
    components: {
        ..._theme.components,
    },
    colors: {
        ..._theme.colors,
        gray: { ..._theme.colors.gray,...colors.gray },
        blue: { ..._theme.colors.blue,...colors.blue },
    },
    styles: {},
    config: {
        ..._theme.config,
        initialColorMode: 'dark',
        disableTransitionOnChange: true,
        useSystemColorMode: false,
    },
}

export function ChakraStuff({
    children,
    initialColorMode = 'dark' as any,

    ...rest
}) {
    let { colorMode } = useColorMode(initialColorMode || undefined)
    const lastColorMode = useRef(colorMode)

    lastColorMode.current = colorMode

    // console.log('colorMode', colorMode)
    const manager: any = {
        get() {
            return lastColorMode.current as any
        },
        type: 'cookie',
        set() {},
        ssr: true,
    }
    return (
        <ChakraProvider
            colorModeManager={manager}
            
            
            theme={theme}
        >
            {children}
        </ChakraProvider>
    )
}
