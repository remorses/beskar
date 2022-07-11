import { Faded } from 'baby-i-am-faded'
import classNames from 'classnames'
import clsx from 'clsx'
import React, { ComponentPropsWithoutRef, ReactNode, useEffect } from 'react'
import { Bullet } from './Bullet'
import { PageContainer } from './PageContainer'

export type HeroProps = {
    heading?: ReactNode
    subheading?: ReactNode
    cta?: ReactNode
    image?: ReactNode
    bullet?: ReactNode
    fingerprint?: ReactNode
    floatingElement?: ReactNode
    animate?: any
} & ComponentPropsWithoutRef<'div'>

export function Hero({
    heading,
    subheading,
    cta,
    image,
    bullet = '',
    fingerprint = '',
    animate = undefined,
    ...rest
}: HeroProps) {
    // useEffect(() => {
    //     console.log('Hero render')
    // })
    return (
        <PageContainer {...rest}>
            <div
                className={clsx(
                    'flex items-center max-w-full min-w-0 flex-col',
                    'md:flex-row leading-normal',
                    image ? 'justify-start md:space-x-8' : 'justify-center',
                )}
            >
                <div
                    className={clsx(
                        'space-y-8 flex max-w-full flex-col text-center min-w-[33%]',
                        image ? 'md:max-w-[60%]' : 'w-full',
                        image ? 'items-start' : 'items-center',
                        image ? 'md:text-left' : 'text-center',
                    )}
                >
                    <div
                        className={clsx(
                            'flex flex-col w-full items-center space-y-4 ',
                            image ? 'md:items-start' : '',
                        )}
                    >
                        {bullet && <Bullet>{bullet}</Bullet>}
                        <ComponentIfString
                            component={'h1'}
                            className='block max-w-2xl text-5xl font-semibold leading-normal'
                        >
                            {heading}
                        </ComponentIfString>
                    </div>
                    <ComponentIfString
                        component={'h2'}
                        className='max-w-xl font-medium text-2xl opacity-80 leading-normal'
                    >
                        {subheading}
                    </ComponentIfString>
                    {cta && (
                        <div
                            className={classNames(
                                'flex flex-col items-center max-w-full  w-full space-y-6',
                                image && `md:items-start `,
                            )}
                        >
                            <div className=''>{cta}</div>

                            <div className='opacity-60 text-xs'>
                                {fingerprint}
                            </div>
                        </div>
                    )}
                </div>
                {image && (
                    <div
                        className={clsx(
                            'flex max-w-full  flex-col md:flex-row flex-auto',
                        )}
                    >
                        <div className='ml-[40px] mt-[40px] flex-auto' />
                        <div
                            className='flex flex-col items-center '
                            // h='100%'
                        >
                            {image}
                        </div>
                    </div>
                )}
            </div>
        </PageContainer>
    )
}

function ComponentIfString({ component: C, children, ...rest }) {
    if (!children) {
        return null
    }
    if (typeof children === 'string') {
        return <C {...rest}>{children}</C>
    }
    return <span {...rest}> {children}</span>
}
