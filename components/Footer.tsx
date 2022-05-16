import clsx from 'clsx'
import React, { ComponentPropsWithoutRef, ReactNode } from 'react'
import { Link } from './Link'

export type FooterProps = {
    columns: { [k: string]: ReactNode[] }
    businessName?: string
    justifyAround?: boolean
} & ComponentPropsWithoutRef<'div'>

export function Footer({
    className = '',
    columns = {},
    justifyAround = false,
    businessName = 'Notaku',
    ...rest
}: FooterProps) {
    return (
        <div
            className={clsx(
                'opacity-90 font-medium text-sm py-10 mx-auto w-full max-w-[var(--pageWidth)]',
                'min-h-[40px]',
                className,
            )}
            {...rest}
        >
            <div
                className={clsx(
                    'flex flex-col items-stretch space-y-10 lg:space-y-0 lg:space-x-10',
                    'lg:flex-row',
                    justifyAround ? 'justify-around' : 'justify-between',
                )}
            >
                {Object.keys(columns).map((k, i) => {
                    return (
                        <div
                            className='min-w-full space-y-6 lg:min-w-0'
                            key={i}
                        >
                            <div className='block w-auto font-medium text-left'>
                                {k}
                            </div>
                            {columns[k].map((x, i) => (
                                <div className='opacity-60' key={i}>
                                    {x}
                                </div>
                            ))}
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export function MyFooter() {
    return (
        <Footer
            className='w-full'
            columns={{
                Resources: [
                    <Link key='1' href='/docs'>
                        Quick start
                    </Link>,
                ],
                Company: [
                    <Link
                        key='1'
                        target='_blank'
                        href='https://twitter.com/__morse'
                    >
                        Twitter
                    </Link>,
                    <Link key='email' href='mailto:tommy@notaku.website'>
                        Contact us
                    </Link>,
                ],
                'Who made this?': [
                    <Link key='1' href='https://twitter.com/__morse'>
                        Twitter
                    </Link>,
                    <Link key='2' href='https://github.com/remorses/'>
                        Github
                    </Link>,
                    <Link key='email' href='mailto:tommy@notaku.website'>
                        Contact me
                    </Link>,
                ],
            }}
        />
    )
}
