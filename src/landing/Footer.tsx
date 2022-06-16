import clsx from 'clsx'
import React, { ComponentPropsWithoutRef, ReactNode } from 'react'
import { PageContainer } from './PageContainer'

export type FooterProps = {
    columns: { [k: string]: ReactNode | ReactNode[] }
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
        <PageContainer {...rest}>
            <div
                className={clsx(
                    'flex flex-col items-stretch space-y-10 lg:flex-row',
                    'lg:space-x-10 lg:space-y-0 pb-14 text-sm',
                    justifyAround ? 'justify-around' : 'justify-between',
                    className,
                )}
            >
                {Object.keys(columns).map((k, i) => {
                    const col = columns[k]
                    return (
                        <div
                            className='min-w-full space-y-6 lg:min-w-0'
                            key={i}
                        >
                            <div className='block w-auto font-medium text-left'>
                                {k}
                            </div>
                            <div className='opacity-60 flex flex-col space-y-2'>
                                {Array.isArray(col)
                                    ? col.map((x, i) => (
                                          <div className='' key={i}>
                                              {x}
                                          </div>
                                      ))
                                    : col}
                            </div>
                        </div>
                    )
                })}
            </div>
        </PageContainer>
    )
}
