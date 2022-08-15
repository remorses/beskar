import clsx from 'clsx'
import React, { ComponentPropsWithoutRef, ReactNode } from 'react'
import { PageContainer } from './PageContainer'

export type HowItWorksProps = {
    heading?: ReactNode
    subheading?: ReactNode
    steps: StepProps[]
    animate?: any
} & ComponentPropsWithoutRef<'div'>

export type StepProps = {
    heading?: ReactNode
    decorativeHeading?: ReactNode
    subheading?: ReactNode
    image?: ReactNode
    cta?: ReactNode
    animate?: any
}

export function HowItWorks({
    heading,
    subheading,
    steps,
    animate = undefined,
    className = '',
    ...rest
}: HowItWorksProps) {
    return (
        <PageContainer className={className} {...rest}>
            <div
                className={clsx(
                    'space-y-8 w-full flex-auto text-center items-center',
                    'flex flex-col',
                )}
            >
                <h2
                    className='text-3xl font-medium'
                    // fontWeight='medium'
                >
                    {heading}
                </h2>
                <div className='max-w-2xl font-medium text-xl'>
                    {subheading}
                </div>
            </div>
            {/* <Box mt='60px' /> */}
            <div
                className={clsx(
                    'flex flex-col space-y-8 items-stretch flex-auto',
                )}
            >
                {steps.map((step, i) => (
                    <Step
                        key={i}
                        animate={animate}
                        number={i + 1}
                        flip={i % 2 !== 0}
                        {...step}
                    />
                ))}
            </div>
        </PageContainer>
    )
}

const Step = ({
    heading,
    subheading,
    number,
    image,
    cta,
    decorativeHeading,
    flip = false,
    animate = undefined,
    ...rest
}: StepProps & { number; flip }) => {
    return (
        <div
            className={clsx(
                'flex items-center justify-between space-y-6 md:space-y-0 md:space-x-8',
                'flex-col',
                flip ? 'md:flex-row-reverse' : 'md:flex-row',
            )}
            {...rest}
        >
            <div className='min-w-[300px] max-w-[50%] flex-auto space-y-6 '>
                <div className='flex items-end opacity-40'>
                    <div className='opacity-70 text-7xl'>{number}</div>
                    <div className='truncate max-w-[300px] font-semibold '>
                        <span className='mx-2' children={' . '} />
                        {decorativeHeading ?? heading}
                    </div>
                </div>
                <div className='opacity-90 font-medium leading-relaxed text-2xl'>
                    {heading}
                </div>

                <div className='max-w-[90%] font-medium leading-relaxed opacity-[0.66] '>
                    {subheading}
                </div>
                {cta && <div className=''>{cta}</div>}
            </div>
            <div className='min-w-[300px] shrink-0 max-w-[600px] flex-auto '>
                {image}
            </div>
        </div>
    )
}
