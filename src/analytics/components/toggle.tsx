import { useRouter } from 'next/router'
import { INTERVALS } from '../lib/constants'

import { ExpandingArrow } from './icons'
import { BadgeSelect } from './badge-select'
import { IntervalProps } from '../lib/stats'
import { useMemo } from 'react'

export default function ToggleAnalyticsInterval({}) {
    const router = useRouter()
    const { slug, key, interval } = router.query as {
        slug?: string
        key: string
        interval?: string
    }

    const currentInterval = (interval as IntervalProps) || '24h'

    return (
        <div className='px-3 py-1 rounded-md shadow bg-white dark:bg-gray-900 border-gray-100 dark:border-gray-600'>
            <BadgeSelect
                options={INTERVALS.map((x) => {
                    return { value: x, name: x }
                })}
                selected={currentInterval}
                // @ts-ignore
                selectAction={(interval) => {
                    router.push(
                        {
                            query: {
                                ...router.query,
                                interval,
                            },
                        },
                        undefined,
                        { shallow: false, scroll: false },
                    )
                }}
            />
        </div>
    )
}
