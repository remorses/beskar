import { useTheme } from 'next-themes'
import React, { useState, useEffect, createContext, useContext } from 'react'
import toast from 'react-hot-toast'

export function useDisclosure() {
    const [isOpen, setIsOpen] = useState(false)
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
            if (successMessage) {
                toast.success(successMessage)
            }
            return result
        } catch (err) {
            if (typeof err === 'object' && !err?.['skipToast']) {
                toast.error(errorMessage, {})
            }

            console.error(err)
        } finally {
            setIsLoading(false)
        }
    }
    return {
        isLoading,
        fn,
    }
}

export function useColorMode() {
    const { resolvedTheme: _resolvedTheme, setTheme } = useTheme()
    function toggleColorMode() {
        setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')
    }
    const [resolvedTheme, setResolvedTheme] = useState(() => {
        return 'light'
    })

    useEffect(() => {
        setResolvedTheme(_resolvedTheme)
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


export type Context = {
    dashboardPath: string // /app for example
    getUserOrgs: () => Promise<{
        defaultOrgId: string
        orgs: { id: string; name: string }[]
    }>
    createOrg: (x: { name }) => Promise<{
        any
    }>
}

export function useBeskar() {
    const data = useContext(context)
    if (!data) {
        throw new Error(
            'useDashboardData must be used within a DashboardProvider',
        )
    }
    return data
}

export const context = createContext<Context>({} as any)
