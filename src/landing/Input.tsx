import clsx from 'clsx'
import { ComponentPropsWithoutRef, ReactNode } from 'react'

export function Input({
    className = '',
    label = '',
    errorMessage = '',
    ...rest
}: ComponentPropsWithoutRef<'input'> & {
    label?: ReactNode
    errorMessage?: ReactNode
}) {
    return (
        <div className='space-y-3'>
            {label && (
                <label className='font-medium text-sm opacity-60'>
                    {label}
                </label>
            )}
            <input
                type='text'
                className={clsx(
                    'bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500',
                    className,
                )}
                {...rest}
            />
            {errorMessage && (
                <div className='font-medium text-sm dark:text-red-300 text-red-500'>
                    {errorMessage}
                </div>
            )}
        </div>
    )
}
