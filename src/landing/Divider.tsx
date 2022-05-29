import classNames from 'classnames'
import React, { ComponentPropsWithoutRef, ReactNode } from 'react'
import { PageContainer } from './PageContainer'

export type DividerProps = {
    heading?: ReactNode
    animate?: any
} & ComponentPropsWithoutRef<'div'>

export const Divider = ({ heading = '', animate, ...rest }: DividerProps) => {
    return (
        <PageContainer {...rest}>
            {heading ? (
                <div
                    className={classNames(
                        'flex justify-center items-center space-x-4 flex-row',
                        'opacity-60',
                    )}
                >
                    <Line />
                    <div
                        className={
                            'font-medium tracking-widest flex-shrink-0 items-center'
                        }
                    >
                        {heading}
                    </div>
                    <Line />
                </div>
            ) : (
                <Line />
            )}
        </PageContainer>
    )
}

function Line(porps) {
    return <div className='w-full flex-auto border' {...porps} />
}
