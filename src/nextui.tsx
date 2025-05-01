// @ts-ignore
import { createTheme, HeroUIProvider } from "@heroui/react"

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

export function NextUiStuff({ children, ...rest }) {
    return <HeroUIProvider {...rest}>{children}</HeroUIProvider>
}
