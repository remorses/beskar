import { ArrowRightIcon } from '@heroicons/react/outline'
import classNames from 'classnames'
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
        <PageContainer dontContain {...rest}>
            <div
                className={clsx(
                    'relative justify-between items-center max-w-full w-full',
                    'flex flex-col ',
                    dir,
                )}
            >
                <div className='space-y-6 flex flex-col px-3 min-w-[300px] max-w-full flex-1'>
                    {bullet && <Bullet>{bullet}</Bullet>}
                    <div
                        className={clsx('text-4xl font-bold leading-relaxed ')}
                    >
                        {heading}
                    </div>
                    <div className=' font-medium opacity-80 max-w-xl'>{subheading}</div>
                    {cta && <div>{cta}</div>}
                </div>

                <div className='w-12 h-12'></div>
                <div
                    className={clsx(
                        'flex flex-col flex-shrink-0 px-3 items-center flex-1',
                        'max-w-[500px] min-w-[300px]',
                    )}
                >
                    {image}
                </div>
            </div>
        </PageContainer>
    )
}

export function FeatureLink({
    children,
    hideArrow = false,
    className = '',
    href = '',
    ...rest
}) {
    return (
        <Link
            href={href}
            className={classNames(
                'flex items-center font-semibold space-x-2',
                className,
            )}
            {...rest}
        >
            <span>{children}</span>
            {!hideArrow && (
                <ArrowRightIcon className='mx-[10px] inline w-4 h-4 ' />
            )}
        </Link>
    )
}

Feature.Link = FeatureLink
