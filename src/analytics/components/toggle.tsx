import { useRouter } from 'next/router'
import { INTERVALS } from '../lib/constants'

import { ExpandingArrow } from './icons'
import { BadgeSelect } from '../../landing/badge-select'
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
        <BadgeSelect.Container>
            <BadgeSelect
                options={INTERVALS.map((x) => {
                    return { value: x, name: x }
                })}
                selected={currentInterval}
                onChange={(interval) => {
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
        </BadgeSelect.Container>
    )
}
