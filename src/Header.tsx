import clsx from 'clsx'

import { useSession } from 'next-auth/react'

import { SelectOrg } from './SelectOrg'

export function DashboardHeader({
    className = '',
    logo,
    links = [] as ReactNode,
    menu,
    ...rest
}) {
    const { data: session } = useSession()
    return (
        <div
            className={clsx(
                'z-10 relative w-full py-4 flex mx-auto space-x-4',
                true ? 'items-end' : 'items-center',
                className,
            )}
            {...rest}
        >
            <div className='flex items-center gap-4'>
                <div className='flex flex-col justify-center space-y-4'>
                    {logo}
                    {/* {hasOrg && <SelectOrg className='min-w-[200px]' />} */}
                </div>
            </div>

            <div className='flex-auto' />
            <div className='flex items-center '>
                <div className='flex items-center md:space-x-8'>
                    <div className='hidden space-x-8 items-center md:flex'>
                        {Array.isArray(links)
                            ? links.map((x, i) => <span key={i}>{x}</span>)
                            : links}
                    </div>
                    {menu}
                </div>
            </div>
        </div>
    )
}

import ColorHash from 'color-hash'
import { colord, extend } from 'colord'
import harmoniesPlugin from 'colord/plugins/harmonies'
import mixPlugin from 'colord/plugins/mix'
import { Button, Link } from './landing'
import { ArrowLeftIcon, ChevronLeftIcon } from '@heroicons/react/solid'
import { ReactNode } from 'react'

extend([mixPlugin, harmoniesPlugin])

const colorHash = new ColorHash({ lightness: 0.6 })

export function AvatarButton({ className, as: As = 'button' as any, name }) {
    const background = (() => {
        if (!name) {
            return '#aaa'
        }
        const color = colorHash.hex(name)

        const [first, second] = colord(color).harmonies('analogous')
        return `linear-gradient(to right, ${first
            .desaturate(0.2)
            .toHex()}, ${second.desaturate(0.4).toHex()})`
    })()
    return (
        <As
            role={'button'}
            aria-label='avatar button'
            style={{ background }}
            className={'rounded-full w-12 h-12 active:opacity-40' + className}
        >
            <ProfileSvg className='opacity-80' />
        </As>
    )
}

function ProfileSvg({ ...rest }) {
    return (
        <svg
            viewBox='0 0 128 128'
            className=''
            role='img'
            aria-label=' avatar'
            {...rest}
        >
            <path
                fill='#fff'
                d='M103,102.1388 C93.094,111.92 79.3504,118 64.1638,118 C48.8056,118 34.9294,111.768 25,101.7892 L25,95.2 C25,86.8096 31.981,80 40.6,80 L87.4,80 C96.019,80 103,86.8096 103,95.2 L103,102.1388 Z'
            />
            <path
                fill='#fff'
                d='M63.9961647,24 C51.2938136,24 41,34.2938136 41,46.9961647 C41,59.7061864 51.2938136,70 63.9961647,70 C76.6985159,70 87,59.7061864 87,46.9961647 C87,34.2938136 76.6985159,24 63.9961647,24'
            />
        </svg>
    )
}
