import React from 'react'

import clsx from 'clsx'
import { colord } from 'colord'

import {
    ComponentPropsWithoutRef,
    ElementType,
    FC,
    forwardRef,
    Fragment,
    useMemo,
} from 'react'

export type ButtonProps = ComponentPropsWithoutRef<'button'> & {
    href?: string
    as?: ElementType
    bg?: string
    biggerOnHover?: boolean
}

export const Button: FC<ButtonProps> = forwardRef<ButtonProps, any>(
    (
        {
            bg = '#3B82F6',
            as: _As = 'button',
            className = '',
            children,
            href,
            biggerOnHover = false,
            ...props
        }: ButtonProps,
        ref,
    ) => {
        const As = href ? 'a' : _As
        const highlight = colord(bg).alpha(0.2).toRgbString()
        return (
            <As
                ref={ref}
                className={clsx(
                    'px-4 py-2 font-medium tracking-wide rounded-md cursor-pointer button',
                    biggerOnHover && 'biggerOnHover',
                    className,
                )}
                href={href}
                style={{ backgroundColor: bg }}
                {...props}
            >
                <style jsx>
                    {`
                        .biggerOnHover {
                            box-shadow: 0 0 0 0 ${highlight};
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
                            background-color: ${bg};
                            transition: transform 0.15s;
                            border-radius: 7px;
                            position: absolute;
                            inset: 0;
                            z-index: -1;
                        }

                        .biggerOnHover:hover::after {
                            transform: scale(1.06);
                        }
                    `}
                </style>
                {children}
            </As>
        )
    },
)

Button.displayName = 'Button'
