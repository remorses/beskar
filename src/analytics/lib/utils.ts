import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'
import { ccTLDs } from './constants'
import { getTimeIntervals } from './stats'

export function useColorMode() {
    const { resolvedTheme: _resolvedTheme, setTheme } = useTheme()
    function toggleColorMode() {
        setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')
    }
    const [resolvedTheme, setResolvedTheme] = useState(() => {
        return 'light'
    })

    useEffect(() => {
        setResolvedTheme(_resolvedTheme!)
    }, [_resolvedTheme])
    return {
        toggleColorMode,
        colorMode: resolvedTheme,
        isDark: resolvedTheme === 'dark',
    }
}

export function nFormatter(num: number, digits?: number) {
    if (!num) return '0'
    const lookup = [
        { value: 1, symbol: '' },
        { value: 1e3, symbol: 'K' },
        { value: 1e6, symbol: 'M' },
        { value: 1e9, symbol: 'G' },
        { value: 1e12, symbol: 'T' },
        { value: 1e15, symbol: 'P' },
        { value: 1e18, symbol: 'E' },
    ]
    const rx = /\.0+$|(\.[0-9]*[1-9])0+$/
    var item = lookup
        .slice()
        .reverse()
        .find(function (item) {
            return num >= item.value
        })
    return item
        ? (num / item.value).toFixed(digits || 1).replace(rx, '$1') +
              item.symbol
        : '0'
}

type IntervalProps = ReturnType<typeof getTimeIntervals>

export function prepareAnalyticsData(
    timeIntervals: IntervalProps['timeIntervals'],
    coefficient: IntervalProps['coefficient'],
    hist: { count: number; bucket: number }[],
) {
    for (let x of hist) {
        x.count = Number(x.count)
        x.bucket = Number(x.bucket)
    }

    const total = hist.reduce((a, b) => a + b.count, 0)
    const data = timeIntervals.map((interval) => ({
        ...interval,
        count: hist.find((d) => d.bucket === interval.start)?.count || 0,
    }))
    return {
        total,
        data,
    }
}
