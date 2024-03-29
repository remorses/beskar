import clsx from 'clsx'
import React, { ComponentPropsWithoutRef } from 'react'

export type BlockProps = {} & ComponentPropsWithoutRef<'div'>

export const Block = ({ className, children, ...rest }: BlockProps) => {
    return (
        <div
            className={clsx(
                'relative flex flex-col min-w-0 overflow-x-auto p-7 px-8 space-y-6 shadow rounded-md',
                'bg-white dark:bg-gray-800',
                className,
            )}
            {...rest}
        >
            {children}
        </div>
    )
}
