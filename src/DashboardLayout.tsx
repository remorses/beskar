import cs from 'classnames'
import { Faded } from 'baby-i-am-faded'

import NextLink from 'next/link'
import React, { ReactNode, useMemo } from 'react'

import { Footer } from './Footer'
import { Header } from './Header'
import { Link } from './Link'
import { useSession } from 'next-auth/react'
import { TabsNav } from './Tabs'

export function DashboardLayout({ header, Tabs, footer, children, ...rest }) {
    return (
        <div className='flex flex-col items-center w-full min-h-screen'>
            <div className='flex  flex-col items-center w-full overflow-visible border-b border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-800/60'>
                <div className='w-full  px-[var(--pagePadding)] max-w-[var(--pageWidth)]'>
                    {header}
                    <TabsNav Tabs={Tabs} />
                </div>
            </div>
            <div
                className={cs(
                    'flex w-full flex-auto flex-col space-y-8 ',
                    'max-w-[var(--pageWidth)] px-[var(--pagePadding)]',
                )}
                {...rest}
            >
                <div className='relative flex flex-auto w-full overflow-visible md:space-x-8 '>
                    <div className='flex w-full'>
                        <Faded
                            className='flex flex-col w-full h-full space-y-8 overflow-visible pt-[40px]'
                            cascade
                        >
                            {children}

                            <div className='flex-1'></div>
                            {footer}
                        </Faded>
                    </div>
                </div>
            </div>
        </div>
    )
}
