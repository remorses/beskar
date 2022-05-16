import clsx from 'clsx'
import React, { useMemo } from 'react'
import NextLink from 'next/link'
import { forwardRef } from 'react'
import { Link } from './Link'
import {
    MoonIcon,
    SunIcon,
    CogIcon,
    LogoutIcon,
    CreditCardIcon,
} from '@heroicons/react/outline'

import { signOut, useSession } from 'next-auth/react'

import { useRouter } from 'next/router'
import { useColorMode, useColorModeValue } from '@app/utils'
import { Avatar } from '@nextui-org/react'
import { DropDownMenu } from './DropDown'
import { AcademicCapIcon } from '@heroicons/react/solid'
import { SelectOrg } from './SelectOrg'
import { getUserOrgs } from '@app/pages/api/functions'

export function Header({ className = '', links = [], ...rest }) {
    const { data: session } = useSession()

    return (
        <div
            className={clsx(
                'z-10 relative w-full py-6 flex items-end mx-auto space-x-8',
                className,
            )}
        >
            <div className='flex flex-col space-y-4'>
                <Logo />
                <SelectOrg
                    getUserOrgs={getUserOrgs}
                    className='min-w-[200px]'
                />
            </div>

            <div className='flex-auto' />
            <div className='flex items-center space-x-8'>
                <div className='hidden space-x-8 md:flex'>
                    {links.map((x, i) => (
                        <span key={i}>{x}</span>
                    ))}
                </div>

                <AvatarMenu name={session?.user?.name || ''} />
            </div>
        </div>
    )
}

function AvatarMenu({ name, imgSrc = '' }) {
    const { toggleColorMode, isDark } = useColorMode()
    const router = useRouter()
    const orgId = router.query.orgId
    let avatar = (
        <div className=''>
            <Avatar
                bordered
                // squared
                // textColor={'white'}
                // color='gradient'
                size={'lg'}
                text={name || 'Unknown'}
            />
        </div>
    )

    return (
        <DropDownMenu button={avatar}>
            <DropDownMenu.Item
                onClick={toggleColorMode}
                icon={useColorModeValue(
                    <MoonIcon className='icon opacity-60' />,
                    <SunIcon className='icon opacity-60' />,
                )}
            >
                {!isDark ? 'Dark mode' : 'Light Mode'}
            </DropDownMenu.Item>
            <NextLink href={`/org/${orgId}/settings`}>
                <DropDownMenu.Item
                    icon={<CogIcon className='icon opacity-60' />}
                >
                    Settings
                </DropDownMenu.Item>
            </NextLink>
            {/* <DropdownMenu.Item
                onClick={() =>
                    updateUpgradeModalState({
                        isOpen: true,
                        reason: '',
                    })
                }
                icon={<CreditCardIcon className='icon opacity-60' />}
            >
                Upgrade
            </DropdownMenu.Item> */}
            <DropDownMenu.Item
                onClick={() => signOut({ callbackUrl: '/' })}
                icon={<LogoutIcon className='icon opacity-60' />}
            >
                Sign out
            </DropDownMenu.Item>
        </DropDownMenu>
    )
}

export function Logo({}) {
    const { status } = useSession()
    return (
        <NextLink href={status === 'authenticated' ? '/org' : '/'} passHref>
            <a className='text-xl font-semibold '>Replicant</a>
        </NextLink>
    )
}
