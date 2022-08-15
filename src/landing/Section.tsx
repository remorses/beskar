import clsx from 'clsx'
import React, { ComponentPropsWithoutRef, CSSProperties } from 'react'

export type SectionProps = {
    degree?: number
    bg: string
} & ComponentPropsWithoutRef<'div'>

export const Section = ({
    children,
    bg,
    className,
    degree: _degree = 2,
    ...rest
}: SectionProps) => {
    // const { bg } = rest
    let degreeStr = _degree.toFixed(1)
    const styles: CSSProperties = {
        background: bg,
        width: '100%',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        position: 'absolute',
        transform: `skewY(${degreeStr}deg)`,
        transformOrigin: 'center',
    }

    return (
        <div className='relative' {...rest}>
            <div style={{ ...styles }} />
            <div
                style={{
                    ...styles,
                    transform: `skewY(${degreeStr + 2}deg)`,
                    opacity: 0.2,
                    transformOrigin: '60%',
                }}
            />
            <div
                style={{
                    transform: `skewY(${degreeStr + 3}deg)`,
                    transformOrigin: '70%',
                    opacity: 0.1,
                    ...styles,
                }}
            />
            <div
                className={clsx(
                    'flex flex-col items-stretch w-full max-w-full',

                    className,
                )}
            >
                {children}
            </div>
        </div>
    )
}
