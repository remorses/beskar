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
    title?: string
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
                return 'bg-blue-100 '
            } else if (type === 'warn') {
                return 'bg-orange-100 '
            }
        }, [type])
        const border = useMemo(() => {
            // return
            if (type === 'error') {
                return '!border-red-400'
            } else if (type === 'info') {
                return '!border-blue-400'
            } else if (type === 'warn') {
                return '!border-amber-400'
            }
        }, [type])
        const fill = useMemo(() => {
            // return
            if (type === 'error') {
                return 'fill-red-400'
            } else if (type === 'info') {
                return 'fill-blue-400'
            } else if (type === 'warn') {
                return 'fill-amber-400'
            }
        }, [type])
        const storageKey = 'Alert: ' + (title || description)
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
                    'relative text-gray-800 flex border-l-[4px] gap-4 flex-col text-center',
                    'p-6 ',
                    border,
                    'lg:flex-row items-center lg:text-left',
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
                    style={{ width: '38px', height: '38px' }}
                    className={clsx(
                        'stroke-white flex-shrink-0 block ',
                        fill,
                        isVertical ? 'lg:self-start' : 'self-center',
                    )}
                />

                <div
                    className={clsx(
                        'flex',
                        isVertical
                            ? 'flex-col gap-3 max-w-2xl'
                            : 'flex-row items-center gap-5',
                    )}
                >
                    {title && <div className='font-semibold'>{title}</div>}
                    <div className='opacity-80'>{description}</div>
                </div>
            </div>
        )
    },
)

Alert.displayName = 'Alert'
