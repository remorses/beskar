import clsx from 'clsx'
import { motion } from 'framer-motion'
import { useRouter } from 'next/router'
import NextLink from 'next/link'
import {
    forwardRef,
    ComponentPropsWithoutRef,
    ReactNode,
    useMemo,
    Fragment,
} from 'react'
import { Faded } from 'baby-i-am-faded'
import classNames from 'classnames'
import React from 'react'

export function TabsNav({ Tabs, ...rest }) {
    Tabs ??= () => {}
    return (
        <div className='relative'>
            {/* <div className='absolute bottom-0 -left-[50vw] w-[200vw] border-b border-current opacity-20'></div> */}
            <nav
                // cascade
                className={classNames(
                    'overflow-y-hidden items-end justify-start w-full flex space-x-10 overflow-x-auto',
                    'min-h-[3em]',
                )}
                {...rest}
            >
                {<Tabs />}
            </nav>
        </div>
    )
}

export const TabLink = forwardRef<
    any,
    ComponentPropsWithoutRef<'a'> & {
        icon?: ReactNode
        isUpgradeButton?: boolean
    }
>(
    (
        {
            href = '',
            icon = null,
            children = null,
            className,
            isUpgradeButton,
            ...props
        },
        ref,
    ) => {
        const isActive = useIsActiveHref(href)

        const NextLinkMaybe = useMemo(() => {
            if (href) {
                return NextLink
            }
            return FragmentLike
        }, [href])

        return (
            <NextLinkMaybe href={href || ''} passHref {...props}>
                <a
                    ref={ref}
                    className={clsx(
                        className,
                        'flex relative py-3 pb-[16px] text-sm items-center outline-none cursor-pointer',
                        'select-none font-medium dark:hover:text-white hover:text-black',
                        isActive
                            ? 'text-black dark:text-white '
                            : 'text-gray-600 dark:text-gray-400',
                    )}
                    href={href}
                    // onClick={onclick}
                    {...props}
                >
                    {isActive && (
                        <motion.div
                            layoutId='line'
                            className={clsx(
                                'absolute left-0 right-0 bottom-0 h-[3px] bg-gray-600 dark:bg-gray-300 rounded',
                                'dark:bg-gray-400',
                            )}
                        />
                    )}

                    <div className='relative flex items-center justify-start font-medium tracking-wide space-x-2'>
                        {icon ? icon : null}
                        <div>{children}</div>
                    </div>
                </a>
            </NextLinkMaybe>
        )
    },
)

TabLink.displayName = 'NavLink'

function FragmentLike({ children }) {
    return <Fragment>{children}</Fragment>
}

function useIsActiveHref(href) {
    const router = useRouter()
    const pathname = router?.asPath || ''
    return useMemo(() => {
        if (
            href &&
            stripQueryStringAndHashFromPath(
                pathname?.replace(/\/$/, '').replace(/\bindex$/, ''),
            ) === stripQueryStringAndHashFromPath(href.replace(/\/$/, ''))
        ) {
            return true
        }
        return false
    }, [pathname, href])
}

function stripQueryStringAndHashFromPath(url: string) {
    return url.split('?')[0].split('#')[0]
}
