import {
    ExclamationCircleIcon,
    InformationCircleIcon,
    ExclamationIcon,
    XIcon as XIcon,
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
import { useDisclosure, useSafeLayoutEffect } from '../utils'

export type AlertProps = ComponentPropsWithoutRef<'div'> & {
    type?: 'error' | 'info' | 'warn'
    title: string
    description?: ReactNode
    isVertical?: boolean
    isClosable?: boolean
}

export const Alert = forwardRef<any, AlertProps>(
    (
        {
            className,
            type = 'info',
            title,
            description,
            isClosable = false,
            children,
            isVertical = false,
            ...props
        },
        ref,
    ) => {
        const { isOpen, onClose } = useDisclosure(true)
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
                return 'bg-red-100'
            } else if (type === 'info') {
                return 'bg-blue-50 '
            } else if (type === 'warn') {
                return 'bg-orange-100 '
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
        const storageKey = 'Alert: ' + title
        useSafeLayoutEffect(() => {
            if (!isClosable) {
                return
            }
            const state = localStorage.getItem(storageKey)
            if (state === 'closed') {
                onClose()
            }
        }, [])
        if (!isOpen) {
            return null
        }
        return (
            <div
                ref={ref}
                className={clsx(
                    'relative text-gray-800 flex border-2 space-y-3 flex-col text-center',
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
                {isClosable && (
                    <button
                        onClick={() => {
                            localStorage.setItem(storageKey, 'closed')
                            onClose()
                        }}
                        className='absolute right-3 top-2 appearance-none rounded'
                    >
                        <XIcon className='w-5 h-5' />
                    </button>
                )}
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
