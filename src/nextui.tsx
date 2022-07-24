// @ts-ignore
import { createTheme, NextUIProvider } from '@nextui-org/react'

import colors from 'tailwindcss/colors'

colors.gray = colors.neutral as any

const formattedColors = Object.fromEntries(
    Object.keys(colors)
        .filter((k) => colors.hasOwnProperty('value'))
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
            backgroundContrast: colors.neutral['800'],
        },
    },
})

// disable dead code elimination
Object.assign(
    {},
    {
        lightTheme,
        darkTheme,
    },
)

export function NextUiStuff({ children, ...rest }) {
    return (
        <NextUIProvider disableBaseline {...rest}>
            {children}
        </NextUIProvider>
    )
}
