import clsx from 'clsx'
import { colord } from 'colord'
import React, {
    ComponentPropsWithoutRef,
    ElementType,
    FC,
    forwardRef,
    ReactNode,
} from 'react'
import { ColorGetter, getColor, useColorMode } from '../utils'
import classNames from 'classnames'
import { Link } from './Link'
import { Spinner } from './Spinner'

export type ButtonProps = ComponentPropsWithoutRef<'button'> & {
    href?: string
    target?: string
    as?: ElementType
    icon?: ReactNode
    bg?: ColorGetter
    bgDark?: ColorGetter
    isLoading?: boolean
    ghost?: boolean
    biggerOnHover?: boolean
}

function getColors(color: ColorGetter, opacity = 1) {
    if (color === 'transparent') {
        return {
            bg: 'transparent',
            bgDark: 'transparent',
            color: 'currentColor',
            // highlight: 'currentColor',
        }
    }
    const bg = getColor(color as any) || color
    const bgd = colord(bg as any).alpha(opacity)
    const text =
        opacity < 0.8 ? 'currentColor' : bgd.isDark() ? 'white' : 'black'
    // const text = 'currentColor'
    const highlight = bgd.alpha(0.2).toRgbString()
    // console.log({ text, highlight, bg })
    return { text, highlight, bg: bgd.toRgbString() }
}

export const Button = forwardRef<any, ButtonProps>(
    (
        {
            bg: bg_,
            bgDark: bgDark_,
            as: _As = 'button',
            ghost,
            className = '',
            type = 'button',
            icon = '',
            children,
            isLoading,
            disabled = false,
            href,
            biggerOnHover = false,
            ...props
        }: ButtonProps,
        ref,
    ) => {
        // isLoading = true
        if (!bg_) {
            bg_ = 'gray.500'
            bgDark_ = bgDark_ || 'gray.300'
        }
        if (!bgDark_ && bg_) {
            bgDark_ = bg_
        }
        const opacity = ghost && !isLoading ? 0.2 : 1
        const light = getColors(bg_, opacity)
        const dark = getColors(bgDark_ || bg_, opacity)
        const As = href ? Link : _As
        const pseudo = ghost && !isLoading ? ':hover' : ''
        return (
            <As
                ref={ref}
                className={clsx(
                    'px-[0.8em] !border-0 py-[0.5em] flex appearance-none gap-2 items-center',
                    'justify-center font-medium tracking-wide rounded-md',
                    'cursor-pointer colorAndBg active:opacity-50 transition-colors',
                    biggerOnHover && !disabled && 'biggerOnHover',
                    disabled && 'opacity-40 pointer-events-none',
                    className,
                )}
                disabled={disabled || isLoading}
                href={href}
                type={type}
                {...props}
            >
                <style jsx>
                    {`
                        .colorAndBg${pseudo} {
                            color: ${light.text};
                            background-color: ${light.bg};
                        }
                        :global(.dark) .colorAndBg${pseudo} {
                            color: ${dark.text};
                            background-color: ${dark.bg};
                        }
                        .biggerOnHover {
                            box-shadow: 0 0 0 0 ${light.highlight};
                        }
                        :global(.dark) .biggerOnHover {
                            box-shadow: 0 0 0 0 ${dark.highlight};
                        }

                        .biggerOnHover {
                            animation: landingBlocksPulseAnimation 1.75s
                                infinite cubic-bezier(0.66, 0, 0, 1);
                        }

                        @keyframes landingBlocksPulseAnimation {
                            to {
                                box-shadow: 0 0 0 20px rgba(255, 255, 255, 0);
                            }
                        }

                        .biggerOnHover {
                            transition: transform 0.15s;
                            cursor: pointer;
                            position: relative;
                            z-index: 1;
                        }

                        .biggerOnHover::after {
                            content: '';
                            background-color: ${light.bg};
                            transition: transform 0.15s;
                            border-radius: 7px;
                            position: absolute;
                            inset: 0;
                            z-index: -1;
                        }
                        :global(.dark) .biggerOnHover::after {
                            background-color: ${dark.bg};
                        }

                        .biggerOnHover:hover::after,
                        .biggerOnHover:active::after {
                            transform: scaleX(1.03) scaleY(1.14);
                        }
                    `}
                </style>
                {icon && !isLoading && <div className=''>{icon}</div>}
                <div className={'relative'}>
                    {
                        <div
                            className={classNames(
                                'absolute inset-0 flex item-center justify-center colorAndBg',

                                !isLoading && 'hidden',
                            )}
                        >
                            <Spinner />
                        </div>
                    }
                    {children}
                </div>
            </As>
        )
    },
)
Button.displayName = 'Button'
