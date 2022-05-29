import clsx from 'clsx'
import React, { ElementType, ReactNode, useMemo } from 'react'
import { Block, BlockProps } from './Block'

export type TableProps = {
    head?: ReactNode[]
    rows?: ReactNode[][]
    footer?: ReactNode
    title?: ReactNode
    isLoading?: boolean
} & BlockProps

export const TableBlock = ({
    title = '',
    head = [],
    rows: _rows = [],
    footer = null,
    isLoading,
    ...rest
}: TableProps) => {
    const rows = useMemo(() => {
        const N = head?.length || 3
        if (isLoading) {
            return new Array(3).fill('').map((_, i) => {
                return new Array(N).fill('').map((_, j) => {
                    return (
                        <Skeleton
                            key={String(i) + String(j)}
                            className={clsx(
                                'h-4',
                                j == 1 && i != 1 ? 'w-16' : 'w-8',
                            )}
                        />
                    )
                })
            })
        }
        return _rows
    }, [_rows, isLoading, head?.length])
    return (
        <Block
            // heading={heading}
            {...rest}
        >
            {title && <div className='p-6 pb-2'>{title}</div>}
            <table className={'text-left w-full min-w-0'}>
                <thead className=''>
                    <tr className=''>
                        {head.map((name, i) => {
                            return (
                                <th
                                    className={clsx(
                                        'px-6 py-2 text-sm font-semibold tracking-wide',
                                        'opacity-60',
                                    )}
                                    key={i}
                                >
                                    {name}
                                </th>
                            )
                        })}
                    </tr>
                </thead>
                <tbody>
                    {rows.map((row, i) => {
                        return (
                            <tr key={i}>
                                {row.map((value, i) => {
                                    return <TData key={i}>{value}</TData>
                                })}
                            </tr>
                        )
                    })}
                </tbody>
            </table>
            {footer && <div className='w-full px-6 py-2'>{footer}</div>}
        </Block>
    )
}

const TData = (props) => {
    return (
        <td
            className={clsx(
                'p-6 text-base break-words whitespace-normal',
                'border-t',
            )}
            {...props}
        />
    )
}

function Skeleton({ as: As = 'div' as ElementType, className = '', ...rest }) {
    return (
        <As
            className={clsx(
                'animate-pulse rounded-sm bg-gray-200 dark:bg-gray-600 ',
                className,
            )}
            {...rest}
        />
    )
}
