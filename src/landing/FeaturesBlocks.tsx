import { Faded } from 'baby-i-am-faded'
import clsx from 'clsx'
import { ComponentPropsWithoutRef, ComponentType, ReactNode } from 'react'
import { PageContainer } from '../landing'

type FeaturesBlocksProps = {
    features: Feature[]
    blocksClassName?: string
} & ComponentPropsWithoutRef<'div'>

type Feature = {
    heading?: ReactNode
    description?: ReactNode
    Icon?: ComponentType<any>
    bullet?: ReactNode
}

export function FeaturesBlocks({
    style = {},
    features,
    className = '',
    blocksClassName = '',
}: FeaturesBlocksProps) {
    return (
        <PageContainer className={className} style={style}>
            <div>
                <Faded
                    delay={500}
                    cascade
                    className={clsx(
                        'justify-center grid gap-12 xl:grid-cols-3 xl:gap-28',
                        'sm:grid-cols-2 md:justify-start md:gap-16',
                    )}
                >
                    {features.map((feature, i) => (
                        <div key={i} className=''>
                            <div className='flex space-x-4'>
                                <div
                                    className={clsx(
                                        'w-14 shadow-lg rounded-lg opacity-90',
                                        'justify-center items-center h-14 flex-shrink-0',
                                        'flex md:rounded-xl',
                                        blocksClassName,
                                    )}
                                >
                                    {feature.Icon && (
                                        <feature.Icon className='w-6 font-bold h-6' />
                                    )}
                                </div>
                                <div className='space-y-1'>
                                    {feature.bullet && (
                                        <div
                                            className={clsx(
                                                'tracking-wider rounded px-1 mb-1 max-w-max',
                                                'font-semibold dark:bg-gray-800 bg-gray-100 text-[10px]',
                                                'py-[2px] -mt-[2.1em]',
                                            )}
                                        >
                                            {feature.bullet}
                                        </div>
                                    )}
                                    <h3 className='text-lg font-semibold md:text-xl'>
                                        {feature.heading}
                                    </h3>
                                    <p className='text-sm opacity-60'>
                                        {feature.description}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </Faded>
            </div>
        </PageContainer>
    )
}
