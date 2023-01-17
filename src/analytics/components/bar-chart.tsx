import cs from 'classnames'
import { ReactNode, useMemo } from 'react'
import { Colord } from 'colord'
import { AxisBottom, AxisLeft } from '@visx/axis'
import { GridRows } from '@visx/grid'
import { scaleBand, scaleLinear } from '@visx/scale'
import { useTooltip, useTooltipInPortal } from '@visx/tooltip'
import { localPoint } from '@visx/event'
import { withParentSize, withScreenSize } from '@visx/responsive'
import { IntervalProps, intervalData, getTimeIntervals } from '../lib/stats'
import { nFormatter, useColorMode } from '../lib/utils'
import styles from './index.module.css'
import { motion } from 'framer-motion'

import { useRouter } from 'next/router'

const LEFT_AXIS_WIDTH = 30

type TooltipData = {
    start: number
    end: number
    count: number
    link: string
}

const rangeFormatter = (maxN: number): number => {
    if (maxN < 5) return 5
    /**
     * Get the max range for a chart based on the maxN value
     */
    return Math.ceil(maxN / 5) * 5
}

export type BarChartData = { start: number; end: number; count: number }[]

function dummyData(time: IntervalProps) {
    return getTimeIntervals(time).timeIntervals.map((x) => ({
        start: x.start,
        end: x.end,
        count: Math.floor(Math.random() * 100),
    }))
}

const BarChart_ = ({
    data: data,
    showMessage = '',
    isValidating,

    backgroundColor = '#bfb8ff',
    maxHeight: CHART_HEIGHT = 400,
    parentWidth: CHART_WIDTH = 1000,
}: {
    data: BarChartData
    isValidating?: boolean

    maxHeight?: number
    parentWidth?: number
    backgroundColor?: string
    showMessage?: ReactNode
}) => {
    const router = useRouter()
    const interval = (router.query.interval as IntervalProps) || '24h'

    data = useMemo(() => {
        if (showMessage && !data?.length) {
            return dummyData(interval)
        }
        return data
    }, [data, showMessage])

    const xScale = useMemo(() => {
        return scaleBand({
            range: [0, CHART_WIDTH],
            domain: data.map((d) => d.start),
            padding: 0.4,
        })
    }, [CHART_WIDTH, data, interval])

    const yScale = useMemo(() => {
        return scaleLinear({
            range: [CHART_HEIGHT, 0],
            domain: [0, rangeFormatter(Math.max(...data.map((d) => d.count)))],
            nice: true,
            round: true,
        })
    }, [data, interval])

    const {
        tooltipOpen,
        tooltipLeft,
        tooltipTop,
        tooltipData,
        hideTooltip,
        showTooltip,
    } = useTooltip<TooltipData>()

    const { containerRef, TooltipInPortal } = useTooltipInPortal({
        // TooltipInPortal is rendered in a separate child of <body /> and positioned
        // with page coordinates which should be updated on scroll. consider using
        // Tooltip or TooltipWithBounds if you don't need to render inside a Portal
        scroll: true,
        debounce: 100, // to avoid a weird tooltip flickering bug
    })

    let tooltipTimeout: number | undefined
    const { colorMode, isDark } = useColorMode()
    const bgInstance = new Colord(backgroundColor)
    const gradientStart = bgInstance.alpha(0.3).toRgbString()
    const gradientStop = bgInstance.alpha(0).toRgbString()

    const labelColor = isDark ? '#eee' : '#444'

    return (
        <figure className='relative flex my-10 ' style={{ width: CHART_WIDTH }}>
            {showMessage && (
                <div
                    className={cs(
                        'justify-center items-center inset-0 flex ',
                        'absolute ml-12 mb-8',
                    )}
                >
                    <div
                        className={cs(
                            ' rounded-xl justify-center',
                            'items-center flex-col flex bg-gray-100/20 backdrop-blur-md',
                            'dark:bg-gray-800/20',
                        )}
                        style={{
                            boxShadow:
                                '0 40px 60px rgba(0,0,0,0.1), 0 0 40px rgba(0,0,0,0.3)',
                        }}
                    >
                        {showMessage}
                    </div>
                </div>
            )}
            <svg
                ref={containerRef}
                height={CHART_HEIGHT}
                width={LEFT_AXIS_WIDTH}
            >
                <AxisLeft
                    hideAxisLine
                    hideTicks
                    left={8}
                    numTicks={4}
                    scale={yScale}
                    tickFormat={(d) => nFormatter(d as number)}
                    tickLabelProps={() => ({
                        fill: labelColor,
                        filter: isValidating ? 'blur(8px)' : 'none',
                        fontSize: 14,
                        textAnchor: 'start',
                        transition: 'all 0.4s ease-in-out',
                    })}
                />
            </svg>
            <svg
                className='overflow-visible'
                height={CHART_HEIGHT}
                width={`calc(100% - ${LEFT_AXIS_WIDTH}px)`}
            >
                <defs>
                    <linearGradient
                        id='chart-shape-gradient'
                        x1='0%'
                        y1='0%'
                        x2='0%'
                        y2='100%'
                    >
                        <stop offset='0%' stopColor={gradientStart} />
                        <stop offset='100%' stopColor={gradientStop} />
                    </linearGradient>
                </defs>
                <AxisBottom
                    hideAxisLine
                    hideTicks
                    scale={xScale}
                    tickFormat={intervalData[interval].format}
                    tickLabelProps={() => ({
                        fill: labelColor,
                        filter: isValidating ? 'blur(8px)' : 'none',
                        fontSize: 12,
                        textAnchor: 'middle',
                        transition: 'all 0.4s ease-in-out',
                    })}
                    numTicks={6}
                    top={CHART_HEIGHT - 5}
                />
                <GridRows
                    numTicks={5}
                    scale={yScale}
                    stroke={colorMode === 'dark' ? '#5a5a5a' : '#d5d5d5'}
                    width={CHART_WIDTH}
                />
                {data.map(({ start, end, count }) => {
                    // const count = Math.round(Math.random() * 100);
                    const barWidth = xScale.bandwidth()
                    const barHeight = CHART_HEIGHT - (yScale(count) ?? 0)
                    const barX = xScale(start) ?? 0
                    const barY = CHART_HEIGHT - barHeight

                    let points = [
                        `${barX + barWidth},${barY + barHeight} `,
                        `${barX + barWidth},${barY} `,
                        `${barX},${barY} `,
                        `${barX},${barY + barHeight}`,
                    ].join(' ')

                    return (
                        <motion.polyline
                            // points="50,50 150,50 150,150 50,150"
                            points={points}
                            key={`bar-${start}-${backgroundColor}`}
                            transition={{ ease: 'easeOut', duration: 0.3 }}
                            className={styles.bar} // to override transformOrigin
                            initial={{ transform: 'scaleY(0)' }}
                            animate={{ transform: 'scaleY(1)' }}
                            style={{
                                stroke: bgInstance.lighten(0.1).toRgbString(),
                                opacity: showMessage ? 0.26 : 1,
                            }}
                            x={barX}
                            y={barY}
                            width={barWidth}
                            height={barHeight}
                            onMouseLeave={() => {
                                tooltipTimeout = window.setTimeout(() => {
                                    hideTooltip()
                                }, 300)
                            }}
                            onMouseMove={(event) => {
                                if (tooltipTimeout) clearTimeout(tooltipTimeout)
                                // TooltipInPortal expects coordinates to be relative to containerRef
                                // localPoint returns coordinates relative to the nearest SVG, which
                                // is what containerRef is set to in this example.
                                const eventSvgCoords = localPoint(event) ?? {
                                    x: 0,
                                    y: 0,
                                }
                                const left = barX + barWidth / 2 - 81
                                showTooltip({
                                    tooltipData: {
                                        start,
                                        end,
                                        count,
                                        link: 'https://google.com',
                                    },
                                    tooltipTop: eventSvgCoords.y - 150,
                                    tooltipLeft: left,
                                })
                            }}
                        />
                    )
                })}
            </svg>
            {tooltipOpen && tooltipData && (
                <TooltipInPortal
                    top={tooltipTop}
                    left={tooltipLeft}
                    className={styles.tooltip}
                >
                    <div className='text-center'>
                        <h3 className='text-black my-1'>
                            <span className='text-2xl font-semibold'>
                                {nFormatter(tooltipData.count)}
                            </span>{' '}
                        </h3>
                        <p className='text-xs opacity-80'>
                            {intervalData[interval].format(tooltipData.start)} -{' '}
                            {intervalData[interval].format(tooltipData.end)}
                        </p>
                    </div>
                </TooltipInPortal>
            )}
        </figure>
    )
}

// @ts-ignore
export const BarChart: typeof BarChart_ = withParentSize(BarChart_)
export default BarChart
