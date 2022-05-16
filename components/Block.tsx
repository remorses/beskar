import clsx from 'clsx'
import React, { ComponentPropsWithoutRef, ReactNode } from 'react'

export type BlockProps = {} & ComponentPropsWithoutRef<'div'>

export const Block = ({ className, children, ...rest }: BlockProps) => {
    return (
        <div
            className={clsx(
                'relative min-w-0 overflow-x-auto p-4 shadow rounded-md border bg-white',
                'dark:bg-gray-800',
                className,
            )}
            {...rest}
        >
            {children}
        </div>
    )
}
