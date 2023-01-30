import { Button, Divider, Modal, Spinner } from './landing'
import {
    ComponentPropsWithoutRef,
    forwardRef,
    Fragment,
    ReactNode,
    useContext,
    useEffect,
    useState,
} from 'react'
import { Listbox, Transition } from '@headlessui/react'
import { CheckIcon, SelectorIcon } from '@heroicons/react/solid'
import classNames from 'classnames'
import useSWR, { useSWRConfig } from 'swr'

import { useBeskar, useThrowingFn } from './utils'
import { useRouter } from 'next/router'
import { useForm } from 'react-hook-form'
import { PlusIcon } from '@heroicons/react/outline'

export type SelectProps = {
    className?: string
    value?: string
    placeholder?: string
    onChange: (x: string) => void
    options: { value: string; name?: ReactNode }[]
    endButton?: ReactNode
    useAutoGradientIcons?: boolean
    isLoading?: boolean
}

/**
 * Needs to have orgId param in query
 */
export const Select: React.FC<
    SelectProps & { children?: ReactNode; ref?: any }
> & {
    SelectButton: typeof SelectButton
} = forwardRef<any, any>(function (
    {
        onChange,
        value,
        endButton = null,
        placeholder = 'Loading',
        options,
        className = '',
        isLoading = false,
        useAutoGradientIcons = false,
    },
    ref,
) {
    const router = useRouter()
    const orgId = (router.query.orgId || '') as string

    const hoverClasses = 'hover:bg-gray-100 hover:dark:bg-gray-600 rounded mx-2'
    const current = options.find((x) => x.value === value)
    return (
        <>
            <Listbox value={orgId} onChange={onChange}>
                <div className={classNames('relative')}>
                    <Listbox.Button
                        ref={ref as any}
                        as='button'
                        className={classNames(
                            'relative w-full py-[8px] pl-3 pr-10 text-left bg-white rounded-lg shadow border dark:bg-gray-700 focus:outline-none focus-visible:ring-1 focus-visible:ring-opacity-75 focus-visible:ring-white focus-visible:ring-offset-gray-300 focus-visible:ring-offset-1 sm:text-sm',
                            className,
                        )}
                    >
                        <div
                            aria-label='current org'
                            className='flex items-center space-x-2 truncate font-medium'
                        >
                            {useAutoGradientIcons && (
                                <GradientIcon
                                    name={
                                        isLoading
                                            ? ''
                                            : current?.name || current?.value
                                    }
                                />
                            )}
                            <span className=''>
                                {isLoading
                                    ? 'Loading'
                                    : current?.name || placeholder}
                            </span>
                        </div>
                        <span className='absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none'>
                            <SelectorIcon
                                className='w-5 h-5 text-gray-400'
                                aria-hidden='true'
                            />
                        </span>
                    </Listbox.Button>
                    <style jsx>{`
                        @keyframes menuAppear {
                            from {
                                opacity: 0;
                                transform: translate3d(0px, -2em, 0px) scale(0);
                            }
                            to {
                                opacity: 1;
                            }
                        }
                    `}</style>
                    <Faded animationName='menuAppear' duration={120} cascade>
                        <Listbox.Options
                            className={classNames(
                                'absolute z-50 gap-2 flex flex-col w-full py-2 mt-1 overflow-auto text-base bg-white rounded-md shadow-xl dark:bg-gray-700 max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm',
                            )}
                        >
                            {options?.map((opt, idx) => (
                                <Listbox.Option
                                    key={opt.value}
                                    className={({ active }) =>
                                        classNames(
                                            `cursor-pointer select-none relative py-[6px] `,
                                            (opt.value === value || active) &&
                                                'bg-gray-100 dark:bg-gray-600',
                                            hoverClasses,
                                        )
                                    }
                                    value={opt.value}
                                >
                                    {({ selected, active }) => (
                                        <>
                                            <div
                                                className={classNames(
                                                    `flex items-center space-x-2 pl-2 truncate font-medium`,
                                                )}
                                            >
                                                {useAutoGradientIcons && (
                                                    <GradientIcon
                                                        name={
                                                            opt?.name ||
                                                            opt?.value
                                                        }
                                                    />
                                                )}
                                                <span className='text-sm'>
                                                    {opt.name || opt.value}
                                                </span>
                                            </div>
                                            {selected ? (
                                                <span
                                                    className={classNames(
                                                        `absolute inset-y-0 right-1 flex items-center pl-3`,
                                                        active
                                                            ? 'text-amber-600'
                                                            : 'text-amber-600',
                                                    )}
                                                >
                                                    <CheckIcon
                                                        className='w-5 h-5'
                                                        aria-hidden='true'
                                                    />
                                                </span>
                                            ) : null}
                                        </>
                                    )}
                                </Listbox.Option>
                            ))}
                            {endButton}
                        </Listbox.Options>
                    </Faded>
                </div>
            </Listbox>
        </>
    )
}) as any

Select.SelectButton = SelectButton

function SelectButton({
    className,
    children,
    ...rest
}: ComponentPropsWithoutRef<'button'>) {
    const hoverClasses = 'hover:bg-gray-100 hover:dark:bg-gray-600 rounded mx-2'
    return (
        <button
            className={classNames(
                'flex space-x-2 py-[5px] pl-2 text-left items-center font-medium text-sm',
                hoverClasses,
                className,
            )}
            {...rest}
        >
            <PlusIcon className='w-4 h-4 mx-px' />
            <div>{children}</div>
        </button>
    )
}

import ColorHash from 'color-hash'
import { colord, extend } from 'colord'
import mixPlugin from 'colord/plugins/mix'
import harmoniesPlugin from 'colord/plugins/harmonies'
import { Faded } from 'baby-i-am-faded'

import { Input } from './landing/Input'

extend([mixPlugin, harmoniesPlugin])

const colorHash = new ColorHash({ lightness: 0.6 })

function GradientIcon({ name }) {
    let width = 18
    const background = (() => {
        if (!name) {
            return '#aaa'
        }
        const color = colorHash.hex(name)

        const [first, second] = colord(color).harmonies('analogous')
        return `linear-gradient(to right, ${first.toHex()}, ${second
            .desaturate(0.3)
            .toHex()})`
    })()
    return (
        <div
            style={{ background, width, height: width }}
            className='rounded-md shrink-0 '
        ></div>
    )
}
