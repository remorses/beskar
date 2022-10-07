import {
    StatsProps,
    processLocationData,
    LocationTabs,
} from '../lib/stats'
import { Colord } from 'colord'
import BadgeSelect from './badge-select'
import { ReactNode, useMemo } from 'react'
import { nFormatter } from '../lib/utils'
import { useState, UIEvent } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { LoadingDots } from './icons'
import classNames from 'classnames'

export default function Ranking({
    data,
    total,
    currentTab,
    tabs,
    onTabChange,
    className,
    title = '',
    barBackgroundColor = '#00308f',
}: {
    data: { count: number; name: ReactNode; icon?: ReactNode }[]
    className?: string
    total: number
    currentTab: string
    barBackgroundColor?: string
    title?: string
    tabs: string[]
    onTabChange: Function
}) {
    const [scrolled, setScrolled] = useState(false)

    const handleScroll = (event: UIEvent<HTMLElement>) => {
        if (event.currentTarget.scrollTop > 0) {
            setScrolled(true)
        } else {
            setScrolled(false)
        }
    }

    const bgInstance = new Colord(barBackgroundColor)

    return (
        <div
            className={classNames(
                'relative bg-white dark:bg-gray-900 px-7 py-5 shadow-lg sm:rounded-lg border border-gray-100 dark:border-0 h-[420px] overflow-scroll scrollbar-hide',
                className,
            )}
            onScroll={handleScroll}
        >
            <div className='mb-5 flex justify-between'>
                <h1 className='text-xl font-semibold'>{title}</h1>
                <BadgeSelect
                    options={tabs}
                    selected={currentTab}
                    // @ts-ignore
                    selectAction={onTabChange}
                />
            </div>
            <div
                className={
                    data && data.length > 0
                        ? 'grid gap-4'
                        : 'h-[300px] flex justify-center items-center'
                }
            >
                {data ? (
                    data.length > 0 ? (
                        data.map(({ name, icon, count }, idx) => (
                            <div
                                key={idx}
                                className='flex justify-between items-center'
                            >
                                <div className='relative flex items-center z-10 w-full max-w-[calc(100%-3rem)]'>
                                    <span className='flex space-x-2 px-2 items-center z-10'>
                                        {icon}
                                        <p className='opacity-90 text-sm'>
                                            {name}
                                        </p>
                                    </span>
                                    <motion.div
                                        style={{
                                            width: `${(count / total) * 100}%`,
                                            borderWidth: '2px',
                                            borderStyle: 'solid',
                                            borderLeftWidth: 0,
                                            borderColor: bgInstance
                                                .lighten(0.2)
                                                .toRgbString(),
                                            // gradient background
                                            backgroundImage: `linear-gradient(90deg, ${bgInstance
                                                .alpha(0)
                                                .toRgbString()} 0%, ${bgInstance
                                                .alpha(0.2)
                                                .toRgbString()} 100%)`,
                                        }}
                                        className='absolute h-8 origin-left'
                                        transition={{
                                            ease: 'easeOut',
                                            duration: 0.3,
                                        }}
                                        initial={{ transform: 'scaleX(0)' }}
                                        animate={{ transform: 'scaleX(1)' }}
                                    />
                                </div>
                                <p className='opacity-60 text-sm z-10'>
                                    {nFormatter(count)}
                                </p>
                            </div>
                        ))
                    ) : (
                        <p className='opacity-60 text-sm'>No data available</p>
                    )
                ) : (
                    <LoadingDots color='#71717A' />
                )}
            </div>
            <AnimatePresence>
                {data && data.length > 9 && !scrolled && (
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        animate={{
                            opacity: 1,
                            y: 0,
                            transition: { type: 'linear', duration: 0.2 },
                        }}
                        exit={{
                            opacity: 0,
                            y: 50,
                            transition: { duration: 0 },
                        }}
                        className='absolute w-full h-8 flex justify-center items-center bottom-0 left-0 right-0 bg-gradient-to-b from-white to-gray-100 text-sm text-gray-500'
                    >
                        Show more
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}
