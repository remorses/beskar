import { useTheme } from 'next-themes'
import '@formatjs/intl-numberformat/polyfill'
import '@formatjs/intl-numberformat/locale-data/en'
import React, { useState, useEffect, createContext, useContext } from 'react'
import toast from 'react-hot-toast'
import colors from '../colors'

import { Faded } from 'baby-i-am-faded'
import router from 'next/router'

Faded.defaultProps = {
    cascadeIncrement: 80,
    duration: 120,
}

export function useDisclosure(defaultIsOpen = false) {
    const [isOpen, setIsOpen] = useState(defaultIsOpen)
    const toggle = () => setIsOpen(!isOpen)
    return {
        isOpen,
        toggle,
        onClose() {
            setIsOpen(false)
        },
        onOpen() {
            setIsOpen(true)
        },
    }
}

// Hook
export function useOnClickOutside(ref, handler) {
    useEffect(
        () => {
            const listener = (event) => {
                // Do nothing if clicking ref's element or descendent elements
                if (!ref.current || ref.current.contains(event.target)) {
                    return
                }
                handler(event)
            }
            document.addEventListener('mousedown', listener)
            document.addEventListener('touchstart', listener)
            return () => {
                document.removeEventListener('mousedown', listener)
                document.removeEventListener('touchstart', listener)
            }
        },
        // Add ref and handler to effect dependencies
        // It's worth noting that because passed in handler is a new ...
        // ... function on every render that will cause this effect ...
        // ... callback/cleanup to run every render. It's not a big deal ...
        // ... but to optimize you can wrap handler in useCallback before ...
        // ... passing it into this hook.
        [ref, handler],
    )
}

// show toasts on success and failure and manages loading state
// you can skip showing the toast on failure putting a field skipToast: true in the error
export function useThrowingFn({
    fn: fnToWrap,
    successMessage = '',
    errorMessage = 'Error',
}) {
    const [isLoading, setIsLoading] = React.useState(false)
    const fn = async function wrappedThrowingFn(...args) {
        try {
            setIsLoading(true)
            const result = await fnToWrap(...args)
            if (result?.skipToast) {
                return result
            }
            if (successMessage) {
                toast.success(successMessage)
            }

            return result
        } catch (err) {
            console.error(err)
            // how to handle unreadable errors? simply don't return them from APIs, just return something went wrong
            if (err instanceof Error && !err?.['skipToast']) {
                toast.error(err.message, {})
                return err
            }
            return err
        } finally {
            setIsLoading(false)
        }
    }
    return {
        isLoading,
        fn,
    }
}

export function useColorMode(initialColorMode = 'dark') {
    const { resolvedTheme: _resolvedTheme, setTheme } = useTheme()
    function toggleColorMode() {
        setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')
    }
    const [resolvedTheme, setResolvedTheme] = useState(() => {
        return initialColorMode
    })

    useEffect(() => {
        setResolvedTheme(_resolvedTheme!)
    }, [_resolvedTheme])
    return {
        toggleColorMode,
        colorMode: resolvedTheme,
        isDark: resolvedTheme === 'dark',
    }
}
export function useColorModeValue(a, b) {
    const { isDark } = useColorMode()

    return isDark ? b : a
}

export type BeskarContext = {}

export function useBeskar() {
    const data = useContext(beskarContext)
    if (!data) {
        throw new Error('useBeskar must be used within a beskarContext')
    }
    return data
}

export const beskarContext = createContext<BeskarContext>({} as any)

type PathImpl<T, Key extends keyof T> = Key extends string
    ? T[Key] extends Record<string, any>
        ?
              | `${Key}.${PathImpl<T[Key], Exclude<keyof T[Key], keyof any[]>> &
                    string}`
              | `${Key}.${Exclude<keyof T[Key], keyof any[]> & string}`
        : never
    : never

type PathImpl2<T> = PathImpl<T, keyof T> | keyof T

type Path<T> = PathImpl2<T> extends string | keyof T ? PathImpl2<T> : keyof T

// type PathValue<T, P extends Path<T>> = P extends `${infer Key}.${infer Rest}`
//     ? Key extends keyof T
//         ? Rest extends Path<T[Key]>
//             ? PathValue<T[Key], Rest>
//             : never
//         : never
//     : P extends keyof T
//     ? T[P]
//     : never

export type ColorGetter = string

export function getColor<P extends ColorGetter>(color: P): string | undefined {
    const c = dotsGet(color, colors) || color
    return c as string
}
function dotsGet(accessor, obj) {
    return accessor
        .split('.')
        .filter(Boolean)
        .reduce((acc, cur) => acc[cur], obj)
}

export const useSafeLayoutEffect =
    typeof window !== 'undefined' ? React.useLayoutEffect : React.useEffect

export function rateLimit<Fn extends (...any: any) => any>({
    max = 100,
    interval,
    fn,
}: {
    max?: number
    interval: 'day' | 'hour'
    fn: Fn
}): Fn {
    let bucket = getTimeBucket(interval)
    let count = 0
    const func: Fn = ((...args) => {
        let currentBucket = getTimeBucket(interval)
        if (currentBucket !== bucket) {
            count = 0
            bucket = currentBucket
        }
        count++
        if (count > max) {
            throw new Error(`Too many function calls in 1 hour: ${max}`)
        }
        return fn(...args)
    }) as Fn
    return func
}

function getTimeBucket(kind: 'day' | 'hour') {
    const now = new Date()
    if (kind === 'day') {
        now.setHours(0)
    }
    now.setMinutes(0)
    now.setSeconds(0)
    now.setMilliseconds(0)
    return now.getTime()
}

export function maxWidthWithPx(px = '60px') {
    return `min(var(--page-max-width, 1200px), calc(100vw - ${px}))`
}

export function refreshSsr() {
    return router.replace(
        {
            pathname: router.pathname,
            query: {
                ...router.query,
                remount: (Number(router.query?.remount || 0) || 0) + 1,
            },
        },
        undefined,
        {
            scroll: false,
            shallow: false,
            unstable_skipClientCache: true,
        },
    )
}


export function formatBigNumber(n: number) {
    const formatter = new Intl.NumberFormat('en-US', {
        compactDisplay: 'short',
        notation: 'compact',
    })
    return formatter.format(n)
}
