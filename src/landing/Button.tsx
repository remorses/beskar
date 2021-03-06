import clsx from 'clsx'
import { colord } from 'colord'
import colors from 'tailwindcss/colors'
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
    const bgd = colord(bg).alpha(opacity)
    const text = opacity < 1 ? 'currentColor' : bgd.isDark() ? 'white' : 'black'
    const highlight = bgd.alpha(0.2).toRgbString()
    // console.log({ text, highlight, bg })
    return { text, highlight, bg: bgd.toRgbString() }
}

export const Button: FC<ButtonProps> = forwardRef<ButtonProps, any>(
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
        const opacity = ghost ? 0.2 : 1
        const light = getColors(bg_, opacity)
        const dark = getColors(bgDark_ || bg_, opacity)
        const As = href ? Link : _As
        const pseudo = ghost ? ':hover' : ''
        return (
            <As
                ref={ref}
                className={clsx(
                    'px-[0.8em] !border-0 py-[0.4em] flex appearance-none gap-2 items-center',
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
                            transform: scaleX(1.03) scaleY(1.08);
                        }
                    `}
                </style>
                {icon && <div className=''>{icon}</div>}
                <div className={'relative'}>
                    {
                        <div
                            className={classNames(
                                'absolute inset-0 colorAndBg',
                                !isLoading && 'hidden',
                            )}
                        >
                            <LoadingSpinner />
                        </div>
                    }
                    {children}
                </div>
            </As>
        )
    },
)

function LoadingSpinner({}) {
    return (
        <div className=''>
            <svg
                role='status'
                className='inline w-[1.4em] h-[1.4em] animate-spin'
                viewBox='0 0 100 100'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'
            >
                <path
                    d='M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z'
                    fill='rgba(0, 0, 0, 0.2)'
                />
                <path
                    d='M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z'
                    fill='currentColor'
                />
            </svg>
        </div>
    )
}

Button.displayName = 'Button'
