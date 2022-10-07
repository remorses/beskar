import cs from 'classnames'
import { Faded } from 'baby-i-am-faded'

import NextLink from 'next/link'
import React, { ReactNode, useMemo } from 'react'

import { Footer } from './landing/Footer'

import { Link } from './landing/Link'
import { useSession } from 'next-auth/react'
import { TabsNav } from './Tabs'
import { ChakraStuff } from './chakra'
import { maxWidthWithPx } from './utils'
import { useRouter } from 'next/router'

export default DashboardLayout

export type DashboardLayoutProps = {
    header?: ReactNode
    Tabs?: React.ComponentType<any>
    footer?: ReactNode
    children?: ReactNode
    style?: any
    className?: string
    fullWidth?: boolean
    pageProps?: any
}

export function DashboardLayout({
    header,
    Tabs,
    footer,
    children = null,
    style = {},
    fullWidth = false,
    pageProps,
    className = '',
    ...rest
}: DashboardLayoutProps) {
    const router = useRouter()
    return (
        <ChakraStuff>
            <div className='flex flex-col items-center w-full min-h-screen'>
                <div className='flex flex-col items-center w-full overflow-visible shadow-sm bg-gray-50 dark:bg-gray-800/60'>
                    <div
                        style={{
                            maxWidth: maxWidthWithPx(),
                        }}
                        className='w-full '
                    >
                        {header}
                        <TabsNav pageProps={pageProps} Tabs={Tabs} />
                    </div>
                </div>
                <div
                    className={cs(
                        'flex w-full flex-auto flex-col space-y-8',
                        className,
                    )}
                    style={{
                        ...style,
                        maxWidth: fullWidth ? '100%' : maxWidthWithPx(),
                        // contain: 'paint',
                    }} // prevents overflow x scrolling and has faster rendering
                    {...rest}
                >
                    <div className='relative flex flex-auto w-full overflow-visible md:space-x-8 '>
                        <div className='flex flex-col w-full'>
                            <div className='flex flex-col w-full h-full space-y-8 overflow-visible pt-[20px] lg:pt-[30px]'>
                                {children}
                            </div>
                            <div className='flex-1'></div>
                            {footer}
                        </div>
                    </div>
                </div>
            </div>
        </ChakraStuff>
    )
}
