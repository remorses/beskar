import {
    ExclamationCircleIcon,
    InformationCircleIcon,
    ExclamationIcon,
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
    type?: 'error' | 'info' | 'warn'
    title: ReactNode
    description?: ReactNode
    isVertical?: boolean
}




export const Alert = forwardRef<any, AlertProps>(
    (
        {
            className,
            type = 'info',
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
            } else if (type === 'warn') {
                return ExclamationIcon
            }
            return Fragment
        }, [type])
        const bg = useMemo(() => {
            if (type === 'error') {
                return 'bg-red-100 text-gray-800'
            } else if (type === 'info') {
                return 'bg-blue-50 text-gray-800'
            } else if (type === 'warn') {
                return 'bg-orange-100 text-gray-800'
            }
        }, [type])
        const border = useMemo(() => {
            if (type === 'error') {
                return 'border-red-400/50'
            } else if (type === 'info') {
                return 'border-blue-400/50'
            } else if (type === 'warn') {
                return 'border-yellow-400/50'
            }
        }, [type])

        return (
            <div
                ref={ref}
                className={clsx(
                    'flex border-2 space-y-3 flex-col text-center',
                    'p-6 rounded-md shadow',
                    border,
                    isVertical
                        ? ''
                        : 'lg:flex-row lg:items-center lg:text-left lg:space-y-0 lg:space-x-3',
                    bg,
                    className,
                )}
                {...props}
            >
                <Icon
                    className={clsx(
                        'self-center flex-shrink-0 block w-8 h-8 pr-2 ',
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
