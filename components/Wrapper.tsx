import 'tailwindcss/tailwind.css'
import 'baby-i-am-faded/styles.css'
import type { AppProps } from 'next/app'
import { SessionProvider, signIn } from 'next-auth/react'
import { ThemeProvider } from 'next-themes'
import { createTheme, NextUIProvider } from '@nextui-org/react'

import { Fragment, useEffect, useMemo, useState } from 'react'

const lightTheme = createTheme({
    type: 'light',
    className: 'light', // customize the class that enables this theme, `light-theme` by default
    theme: {},
})

const darkTheme = createTheme({
    type: 'dark',
    className: 'dark', // customize the class that enables this theme, `light-theme` by default
    theme: {
        colors: {
            background: '#fc0000',
        },
    },
})

export function Wrapper({ children }) {
    return (
        <ThemeProvider
            defaultTheme='light'
            value={{
                light: lightTheme.className,
                dark: darkTheme.className,
            }}
            enableSystem={true}
            attribute='class'
        >
            <Toaster containerStyle={{ zIndex: 10000 }} position='top-center' />
            <NextUIProvider disableBaseline>{children}</NextUIProvider>
        </ThemeProvider>
    )
}
