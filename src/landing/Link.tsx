import clsx from 'clsx'
import NextLink from 'next/link'
import React, { ComponentPropsWithoutRef, forwardRef, Fragment } from 'react'

export type LinkProps = ComponentPropsWithoutRef<'a'> & { underline?: boolean }

export const Link = forwardRef<any, LinkProps>(
    ({ href = '', onClick, underline, children, className, ...props }, ref) => {
        const isExternal =
            href && !href.startsWith('/') && !href.startsWith('#')
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
                        'appearance-none max-w-max relative',
                        'font-medium !border-white/0 truncate cursor-pointer',
                        underline
                            ? `underline`
                            : 'no-underline border-b-[2px] hover:!border-[color:currentColor]',
                        className,
                    )}
                    onClick={
                        onClick &&
                        ((e) => {
                            if (!href) {
                                // otherwise it will trigger the link
                                e.preventDefault()
                            }
                            onClick && onClick(e)
                        })
                    }
                    style={{
                        transition: `all 0.1s ease 0s`,
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
