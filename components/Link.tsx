import clsx from 'clsx'
import React, { ComponentPropsWithoutRef, ReactNode } from 'react'
import NextLink from 'next/link'
import { forwardRef } from 'react'

export interface LinkProps extends ComponentPropsWithoutRef<'a'> {
    icon?: ReactNode
}

export const Link = forwardRef<any, LinkProps>(
    ({ href = '', icon = null, children = null, className, ...props }, ref) => {
        const isExternal = !href.startsWith('/')
        const Wrapper = !isExternal ? NextLink : 'span'
        if (isExternal && !props.target) {
            props.target = '_blank'
        }
        return (
            <Wrapper
                href={href || ''}
                ref={ref}
                {...(isExternal ? {} : { passHref: true })}
            >
                <a
                    className={clsx(
                        'inline-flex items-center outline-none cursor-pointer font-medium',
                        'hover:underline',
                        className,
                    )}
                    href={href}
                    {...props}
                >
                    {icon ? icon : null}
                    <span>{children}</span>
                </a>
            </Wrapper>
        )
    },
)

Link.displayName = 'Link'
