import { Colord } from 'colord'
import React, { ComponentPropsWithoutRef, FC } from 'react'

function lighter(c) {
    // const { colorMode } = useColorMode()
    // const isDark = colorMode === 'dark'
    const newColor = new Colord(c).alpha(0.06)
    return newColor.toRgbString()
}

function getCliPath({ distortion }) {
    const isNegative = distortion < 0
    distortion = Math.abs(distortion)
    let a = distortion * 100
    let b = 100 - distortion * 100
    if (isNegative) {
        return `polygon(0 ${a}%, 100% 0, 100% ${b}%, 0 100%)`
    }

    return `polygon(0% 0, 100% ${a}%, 100% 100%, 0 ${b}%)`
}

export const GradientRect: FC<
    {
        primary?: string
        secondary?: string
        distortion?: number
    } & ComponentPropsWithoutRef<'div'>
> = ({
    primary = '#ffa257', // #e9fcff
    secondary = '#ff71e0', // #fdf2ed
    distortion = 0.3,
    ...rest
}) => {
    primary = lighter(primary)
    secondary = lighter(secondary)
    const clipPath = getCliPath({ distortion })
    return (
        <div
            style={{
                clipPath,
                width: '80%',
                maxWidth: 800,
                maxHeight: 300,
                height: '70%',
                background: `linear-gradient(45deg, ${primary} 30%, ${secondary} 60%)`,
            }}
            {...rest}
        />
    )
}
