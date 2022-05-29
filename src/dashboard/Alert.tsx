import {
    ExclamationCircleIcon,
    InformationCircleIcon,
} from '@heroicons/react/outline'
import clsx from 'clsx'
import React, {
    ComponentPropsWithoutRef,
    ComponentType,
    forwardRef,
    Fragment,
    ReactNode,
    useMemo,
} from 'react'

export type AlertProps = ComponentPropsWithoutRef<'div'> & {
    type: 'error' | 'info'
    title: ReactNode
    description?: ReactNode
    isVertical?: boolean
}

export const Alert = forwardRef<any, AlertProps>(
    (
        {
            className,
            type,
            title,
            description,
            children,
            isVertical = false,
            ...props
        },
        ref,
    ) => {
        const Icon: ComponentType<any> = useMemo(() => {
            if (type === 'error') {
                return ExclamationCircleIcon
            } else if (type === 'info') {
                return InformationCircleIcon
            }
            return Fragment
        }, [type])
        const bg = useMemo(() => {
            if (type === 'error') {
                return 'dark:bg-red-500 !bg-opacity-30 bg-red-200'
            } else if (type === 'info') {
                return 'dark:bg-blue-500 !bg-opacity-40 bg-blue-200'
            }
        }, [type])

        return (
            <div
                ref={ref}
                className={clsx(
                    'flex border space-x-3 space-y-3 flex-col text-center',
                    'p-6 rounded',
                    isVertical
                        ? ''
                        : 'lg:flex-row lg:text-left lg:space-y-0 lg:space-x-3',
                    bg,
                    className,
                )}
                {...props}
            >
                <Icon
                    className={clsx(
                        'self-center flex-shrink-0 block w-8 h-8 pr-2 font-normal ',
                        !isVertical && 'lg:self-start',
                    )}
                />

                <div className='font-semibold'>{title}</div>
                <div className=''>{description}</div>
            </div>
        )
    },
)

Alert.displayName = 'Alert'
