import { NextRequest } from 'next/server'
import { COUNTRIES } from './constants'

export interface RawStatsProps {
    geo: NextRequest['geo']
    ua: any
    referer: string
    timestamp: number
}

export interface StatsProps {
    key: string
    interval: IntervalProps
    totalClicks: number
    clicksData: { start: number; end: number; count: number }[]
    locationData: {
        country: string
        countryCode: string
        city: string
        region: string
    }[]
    deviceData: { device: string; browser: string; os: string; bot: string }[]
}

export type IntervalProps = '1h' | '24h' | '7d' | '30d'

export const intervalData = {
    '1h': {
        milliseconds: 3600000,
        intervals: 60,
        coefficient: 60000,
        format: (e: number) =>
            new Date(e).toLocaleTimeString('en-us', {
                hour: 'numeric',
                minute: 'numeric',
            }),
    },
    '24h': {
        milliseconds: 86400000,
        intervals: 24,
        coefficient: 3600000,
        format: (e: number) =>
            new Date(e)
                .toLocaleDateString('en-us', {
                    month: 'short',
                    day: 'numeric',
                    hour: 'numeric',
                })
                .replace(',', ' '),
    },
    '7d': {
        milliseconds: 604800000,
        intervals: 7,
        coefficient: 86400000,
        format: (e: number) =>
            new Date(e).toLocaleDateString('en-us', {
                month: 'short',
                day: 'numeric',
            }),
    },
    '30d': {
        milliseconds: 2592000000,
        intervals: 30,
        coefficient: 86400000,
        format: (e: number) =>
            new Date(e).toLocaleDateString('en-us', {
                month: 'short',
                day: 'numeric',
            }),
    },
}

export const getTimeIntervals = (interval: IntervalProps) => {
    const { milliseconds, intervals, coefficient } = intervalData[interval]
    const endTimestamp = Math.ceil(Date.now() / coefficient) * coefficient
    const startTimestamp = endTimestamp - milliseconds
    const timeIntervals = Array.from({ length: intervals }, (_, i) => ({
        start: startTimestamp + i * coefficient,
        end: startTimestamp + (i + 1) * coefficient,
    }))
    return { startTimestamp, endTimestamp, timeIntervals, coefficient }
}

export interface LocationStatsProps {
    display: string
    code: string
    count: number
}

export type LocationTabs = 'country' | 'city' | 'region'



export interface DeviceStatsProps {
    display: string
    count: number
}

export const handleDeviceEdgeCases = (ua: string): string => {
    if (ua.includes('curl')) {
        return 'Curl Request'
    } else if (ua.includes('Slackbot')) {
        return 'Slack Bot'
    } else if (ua.includes('Twitterbot')) {
        return 'Twitter Bot'
    } else if (ua.includes('facebookexternalhit')) {
        return 'Facebook Bot'
    } else if (ua.includes('LinkedInBot')) {
        return 'LinkedIn Bot'
    } else if (ua.includes('WhatsApp')) {
        return 'WhatsApp Bot'
    } else if (ua.includes('TelegramBot')) {
        return 'Telegram Bot'
    } else if (ua.includes('Discordbot')) {
        return 'Discord Bot'
    } else if (ua.includes('Googlebot')) {
        return 'Google Bot'
    } else if (ua.includes('Baiduspider')) {
        return 'Baidu Bot'
    } else if (ua.includes('bingbot')) {
        return 'Bing Bot'
    } else if (ua.includes('YandexBot')) {
        return 'Yandex Bot'
    } else if (ua.includes('DuckDuckBot')) {
        return 'DuckDuckGo Bot'
    } else {
        return 'Unknown'
    }
}
