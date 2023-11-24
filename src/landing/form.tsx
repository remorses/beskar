import classNames from 'classnames'
import {
    ComponentPropsWithRef,
    forwardRef,
    useEffect,
    useImperativeHandle,
    useRef,
} from 'react'
import { Spinner } from './Spinner'

export const Textarea = forwardRef<
    any,
    ComponentPropsWithRef<'textarea'> & { autoResize?: boolean }
>(function Textarea({ className, autoResize, ...rest }, ref) {
    let innerRef = useRef<HTMLTextAreaElement>(null)
    useImperativeHandle(ref, () => innerRef.current)
    useEffect(() => {
        if (!autoResize) {
            return
        }
        if (!rest.value) {
            return
        }
        let a = innerRef.current
        if (!a) return
        a.style.height = 'auto'
        a.style.height = a.scrollHeight + 'px'
    }, [rest.value])

    return (
        <textarea
            ref={innerRef}
            className={classNames(
                'w-full tracking-wide text-gray-900 ',
                'rounded-lg px-2.5 py-[6px] border-gray-300 focus:ring-2 block',
                'bg-gray-50 focus:ring-gray-400/70 ring-1 ring-gray-200 dark:ring-gray-800 focus:border-gray-500',
                'dark:text-white dark:placeholder-gray-400',
                'dark:focus:ring-gray-500 ',
                ' dark:bg-gray-700',
                className,
            )}
            {...rest}
        />
    )
})

export const Input = forwardRef<any, ComponentPropsWithRef<'input'>>(
    function Textarea({ className, ...rest }, ref) {
        return (
            <input
                ref={ref}
                className={classNames(
                    'w-full tracking-wide text-gray-900 ',
                    'rounded-lg px-2.5 py-[6px] border-gray-300 focus:ring-2 block',
                    'bg-gray-50 focus:ring-gray-400/70 ring-1 ring-gray-200 dark:ring-gray-800 focus:border-gray-500',
                    'dark:text-white dark:placeholder-gray-400',
                    'dark:focus:ring-gray-500 dark:focus:ring-gray-500 ',
                    ' dark:bg-gray-700',
                    className,
                )}
                {...rest}
            />
        )
    },
)

export const Button = forwardRef<
    any,
    ComponentPropsWithRef<'button'> & { isLoading?: boolean }
>(function Button({ className, children, isLoading = false, ...rest }, ref) {
    return (
        <button
            type='button'
            className={classNames(
                'w-full text-white text-center rounded-lg px-4 transition-colors',
                'justify-center items-center font-semibold dark:text-white',
                'flex dark:bg-gray-700 sm:w-auto dark:hover:bg-gray-800 hover:bg-gray-300',
                'focus:ring-gray-300 focus:ring-2 focus:outline-none',
                'dark:hover:bg-gray-700 dark:focus:ring-gray-500',
                'dark:bg-gray-600 min-w-[140px] min-h-[42px] bg-gray-200 text-gray-800',
            )}
            {...rest}
        >
            {isLoading ? <Spinner /> : children}
        </button>
    )
})

export function GhostButton({
    className,
    ...rest
}: ComponentPropsWithRef<'button'>) {
    return (
        <button
            className={classNames(
                'p-2 py-[6px] ',
                'max-w-max justify-center font-medium items-center shrink-0 min-h-[34px]',
                'flex gap-2 ease-in-out appearance-none active:opacity-100',
                ' whitespace-nowrap hover:bg-gray-100 dark:hover:bg-gray-800 transition-all rounded',
                className,
            )}
            type='button'
            {...rest}
        />
    )
}

const bgSvg = encodeURIComponent(
    `<svg  viewBox="0 0 12 8"  xmlns="http://www.w3.org/2000/svg"><path d="M8 .5v7L12 4zM0 4l4 3.5v-7z" fill="#FFFFFF" fill-rule="nonzero"/></svg>`,
)

export const RangeSlider = forwardRef<
    any,
    ComponentPropsWithRef<'input'> & {
        bg?: string
        min: number
        max: number
        step?: number
    }
>(({ min, max, bg = '#388bd2', step, ...rest }, ref) => {
    let radix = 1
    const bigger = 1.2
    return (
        <div>
            <input
                ref={ref}
                type='range'
                min={min}
                max={max}
                step={step}
                className='range px-3 block'
                {...rest}
            />
            <style jsx>
                {`
                    input[type='range'] {
                        -moz-appearance: none;
                        -webkit-appearance: none;
                        background: rgba(0, 0, 0, 0.1);

                        border-radius: 3px;
                        height: ${radix / 3}em;
                        width: 100%;
                        margin-top: ${radix / 2}em;
                        margin-bottom: ${radix / 2}em;
                        outline: 0;
                    }

                    :global(.dark) input[type='range'] {
                        background: rgba(255, 255, 255, 0.2);
                    }

                    input[type='range']::-webkit-slider-thumb {
                        -webkit-appearance: none;
                        appearance: none;
                        background-color: ${bg};
                        background-image: url('data:image/svg+xml;charset=US-ASCII,${bgSvg}');
                        padding: 10px;
                        background-position: center;
                        background-size: 50%;
                        background-repeat: no-repeat;
                        border: 0;
                        border-radius: 50%;
                        cursor: pointer;
                        height: ${radix * bigger}em;
                        width: ${radix * bigger}em;
                    }

                    input[type='range']::-moz-focus-outer {
                        border: 0;
                    }
                `}
            </style>
        </div>
    )
})
