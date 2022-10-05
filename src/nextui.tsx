// @ts-ignore
import { createTheme, NextUIProvider } from '@nextui-org/react'

import colors from '../colors'

const formattedColors = Object.fromEntries(
    Object.keys(colors)
        .filter((k) => colors.hasOwnProperty(k))
        .flatMap((colorName) => {
            const colorObj = colors[colorName]
            if (typeof colorObj === 'string') {
                return [[colorName, colorObj]]
            }
            return Object.keys(colorObj).map((colorNumber) => {
                if (!colorName) {
                    return []
                }
                return [`${colorName}-${colorNumber}`, colorObj[colorNumber]]
            })
        })
        .filter(Boolean),
)

// console.log(formattedColors)
const lightTheme = createTheme({
    type: 'light',
    className: 'light',
    theme: {
        colors: {
            ...formattedColors,
            backgroundContrast: '#fff',
        },
    },
})

const darkTheme = createTheme({
    type: 'dark',
    className: 'dark',
    theme: {
        colors: {
            ...formattedColors,
            backgroundContrast: colors.gray['800'],
        },
    },
})

export function NextUiStuff({ children, ...rest }) {
    return (
        <NextUIProvider
            defaultTheme={'dark'}
            attribute='class'
            value={{
                light: lightTheme.className,
                dark: darkTheme.className,
            }}
            disableBaseline
            {...rest}
        >
            {children}
        </NextUIProvider>
    )
}
