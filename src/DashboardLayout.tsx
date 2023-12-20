import cs from 'classnames'
import React, { ReactNode } from 'react'

import { useRouter } from 'next/router'
import { TabsNav } from './Tabs'
import { ChakraStuff } from './chakra'
import { maxWidthWithPx } from './utils'
import clsx from 'classnames'

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
                        'flex w-full grow flex-col space-y-8',
                        className,
                    )}
                    style={{
                        ...style,
                        maxWidth: fullWidth ? '100%' : maxWidthWithPx(),
                        // contain: 'paint',
                    }} // prevents overflow x scrolling and has faster rendering
                    {...rest}
                >
                    <div
                        className={clsx(
                            'flex flex-col w-full h-full space-y-8 grow overflow-visible ',
                            !fullWidth && 'pt-[20px] lg:pt-[30px]',
                        )}
                    >
                        {children}
                    </div>
                    <div className='grow'></div>
                    {!fullWidth && footer}
                </div>
            </div>
        </ChakraStuff>
    )
}
