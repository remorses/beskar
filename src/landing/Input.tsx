import clsx from 'clsx'
import { ComponentPropsWithoutRef, forwardRef, ReactNode } from 'react'

export const Input = forwardRef<
    any,
    ComponentPropsWithoutRef<'input'> & {
        label?: ReactNode
        errorMessage?: ReactNode
        description?: ReactNode
    }
>(function Input(
    {
        className = '',
        label = '',
        description = '',
        errorMessage = '',
        ...rest
    },
    ref,
) {
    return (
        <div className='space-y-3'>
            {label && (
                <label className='block font-medium opacity-60'>
                    {label}
                </label>
            )}
            {description && (
                <label className='block font-medium text-sm opacity-50'>
                    {description}
                </label>
            )}
            <input
                ref={ref}
                type='text'
                style={
                    {
                        // transition: 'box-shadow 0.2s ease-in-out',
                    }
                }
                className={clsx(
                    'w-full text-gray-900 rounded-lg p-[0.34em] px-3 transition-shadow font-medium tracking-wide',
                    'border-gray-300 block bg-gray-50 focus:ring-2 ring-gray-300 dark:ring-gray-600 focus:ring-gray-400',
                    'focus:!outline-none',
                    'dark:text-white dark:placeholder-gray-400',
                    'dark:focus:ring-gray-500 ring-1 ',
                    'dark:border-gray-600 dark:bg-gray-700',
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
})
