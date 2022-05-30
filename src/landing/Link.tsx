import clsx from 'clsx'
import NextLink from 'next/link'
import React, { ComponentPropsWithoutRef, forwardRef, Fragment } from 'react'

export type LinkProps = ComponentPropsWithoutRef<'a'>

export const Link = forwardRef<any, LinkProps>(
    ({ href = '', children, className, ...props }, ref) => {
        const isExternal = !href.startsWith('/') && !href.startsWith('#')
        const Wrapper: any = !isExternal ? NextLink : Fragment
        if (isExternal && !props.target) {
            props.target = '_blank'
        }
        return (
            <Wrapper {...(isExternal ? {} : { passHref: true, href })}>
                <a
                    ref={ref}
                    href={href || ''}
                    className={clsx(
                        'appearance-none max-w-max relative no-underline',
                        'font-medium !border-white/0 truncate cursor-pointer',
                        'border-b-[2px] hover:!border-[color:currentColor]',
                        className,
                    )}
                    style={{
                        transition: `all 0.2s ease-in-out 0s`,
                    }}
                    {...props}
                >
                    {children}
                </a>
            </Wrapper>
        )
    },
)

Link.displayName = 'Link'
