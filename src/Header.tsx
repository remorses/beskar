import clsx from 'clsx'
import React, { useMemo } from 'react'
import NextLink from 'next/link'
import { forwardRef } from 'react'
import { Link } from './landing/Link'
import {
    MoonIcon,
    SunIcon,
    CogIcon,
    LogoutIcon,
    CreditCardIcon,
} from '@heroicons/react/outline'

import { signOut, useSession } from 'next-auth/react'

import { useRouter } from 'next/router'
import { useColorMode, useColorModeValue, useBeskar } from './utils'
import { Avatar } from '@nextui-org/react'
import { DropDownMenu } from './DropDown'
import { AcademicCapIcon } from '@heroicons/react/solid'
import { SelectOrg } from './SelectOrg'

export function Header({ className = '', logo, links = [], ...rest }) {
    const { data: session } = useSession()
    const { getUserOrgs } = useBeskar()
    return (
        <div
            className={clsx(
                'z-10 relative w-full py-6 flex items-end mx-auto space-x-8',
                className,
            )}
        >
            <div className='flex flex-col  space-y-4'>
                {logo}
                <SelectOrg className='min-w-[200px]' />
            </div>

            <div className='flex-auto' />
            <div className='flex items-center space-x-8'>
                <div className='hidden space-x-8 items-center md:flex'>
                    {links.map((x, i) => (
                        <span key={i}>{x}</span>
                    ))}
                </div>
            </div>
        </div>
    )
}

import ColorHash from 'color-hash'
import { colord, extend } from 'colord'
import mixPlugin from 'colord/plugins/mix'
import harmoniesPlugin from 'colord/plugins/harmonies'

extend([mixPlugin, harmoniesPlugin])

const colorHash = new ColorHash({ lightness: 0.6 })

export function AvatarButton({ className, name }) {
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
        <button
            role={'button'}
            aria-label='avatar button'
            style={{ background }}
            className={'rounded-full w-12 h-12 active:opacity-40' + className}
        ></button>
    )
}
