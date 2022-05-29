import { ArrowRightIcon } from '@heroicons/react/outline'
import clsx from 'clsx'
import React, { ComponentPropsWithoutRef, ReactNode } from 'react'
import { Bullet } from './Bullet'
import { Link } from './Link'
import { PageContainer } from './PageContainer'

export type FeatureProps = {
    heading?: ReactNode
    subheading?: ReactNode
    direction?: 'row' | 'column'
    image?: ReactNode
    cta?: ReactNode
    bullet?: ReactNode
    flip?: boolean
    animate?: any
} & ComponentPropsWithoutRef<'div'>

export function Feature({
    heading,
    subheading,
    bullet = '',
    image = null as any,
    flip = false,
    cta = '',
    animate = undefined,
    direction = 'row',
    ...rest
}: FeatureProps) {
    const dir = (() => {
        if (direction === 'row') {
            if (flip) {
                return 'md:flex-row-reverse'
            }
            return 'md:flex-row'
        }
        if (direction === 'column') {
            if (flip) {
                return 'md:flex-column-reverse'
            }
            return 'md:flex-column'
        }
    })()

    return (
        <PageContainer {...rest}>
            <div
                className={clsx(
                    'relative justify-between items-center w-full',
                    'flex flex-col',
                    dir,
                )}
            >
                <div className='space-y-6 flex flex-col min-w-[300px] flex-1'>
                    {bullet && <Bullet>{bullet}</Bullet>}
                    <div className={clsx('text-4xl font-medium ')}>
                        {heading}
                    </div>
                    <div className='text-xl font-medium opacity-80'>
                        {subheading}
                    </div>
                    {cta && <div>{cta}</div>}
                </div>

                <div className='w-12 h-12'></div>
                <div
                    className={clsx(
                        'flex flex-col flex-shrink-0 items-center flex-1',
                        'max-w-[500px] min-w-[300px]',
                    )}
                >
                    {image}
                </div>
            </div>
        </PageContainer>
    )
}

export function FeatureLink({ children, hideArrow = false, href = '' }) {
    return (
        <Link href={href} className='flex items-center space-x-2'>
            <span>{children}</span>
            {!hideArrow && (
                <ArrowRightIcon className='mx-[10px] inline w-4 h-4 ' />
            )}
        </Link>
    )
}

Feature.Link = FeatureLink
