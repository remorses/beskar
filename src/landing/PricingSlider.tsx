import { Spinner } from './Spinner'
import { CheckCircleIcon, CheckIcon } from '@heroicons/react/solid'
import { Faded } from 'baby-i-am-faded'
import classNames from 'classnames'
import { signIn, useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import NProgress from 'nprogress'
import React, {
    ComponentPropsWithoutRef,
    ReactNode,
    useEffect,
    useMemo,
    useState,
} from 'react'
import '../global'
import toast from 'react-hot-toast'
import { Link } from './Link'
import { useThrowingFn } from '../utils'
import { PageContainer } from './PageContainer'
import { Button } from './Button'

export type Subscription = {
    // paddleSubscriptionId: string
    productId: string
    id: string
    // unit_price: string | number // float number
}
export type Product = {
    billing_type: string // 'month' | 'year'
    productId: string
    prices: Price[]
    limits: Record<string, ReactNode>
}

export type Price = {
    unitAmount: number
    currency: string
}

export type PricingSliderProps = {
    products: Product[]
    features: string[]
    promptLogin?: () => void
    getSubscription: () => Promise<Subscription | null>
    updatePlan: (x: { subscriptionId: string; planId: string }) => Promise<any>
    isLoading?: boolean
    animate?: boolean
    pricesCurrency?: string
    manageSubscriptionHandler: Function
    buttonText?: ReactNode
    allowYearlyBilling?: boolean
    hideUpgradeButton?: boolean
    trialDays?: number
    onCheckout?: (x: {
        isChangePlan?: boolean
        userId?: string
        productId: string
        // priceId: string
        email?: string
    }) => any
    needMoreEmail: string
} & ComponentPropsWithoutRef<'div'>

// const getSubscriptionMemoized = memoize(getSubscription, { isPromise: true })

export function PricingSlider({
    products = [],
    animate = false,
    className = '',
    isLoading = false,
    onCheckout,
    trialDays,
    promptLogin = () => {
        signIn()
    },
    updatePlan,
    hideUpgradeButton = false,
    getSubscription,
    features,
    manageSubscriptionHandler,
    pricesCurrency = 'usd',
    allowYearlyBilling = true,
    needMoreEmail,
    ...rest
}: PricingSliderProps) {
    const [subscription, setSubscription] = useState<Subscription>()
    const { status, data: session } = useSession()

    function refetchSubscription() {
        setSubscription(undefined)
        getSubscription().then((subscription) => {
            if (subscription) {
                setSubscription(subscription)
            }
        })
    }

    const [billingInterval, setBillingInterval] = useState<string>('month')

    useEffect(() => {
        void (async () => {
            if (status !== 'authenticated') {
                return
            }
            const subscription = await getSubscription()
            if (subscription) {
                setSubscription(subscription)
            }
        })()
    }, [status])

    const FadedComponent = animate ? Faded : 'div'
    const ranges = products
        .sort(
            (a, b) =>
                a?.prices?.find((one) => one.currency === pricesCurrency)
                    ?.unitAmount! -
                b?.prices?.find((one) => one.currency === pricesCurrency)
                    ?.unitAmount!,
        )
        .filter((x) => {
            if (status === 'authenticated') {
                return x.prices.every((p) => p.unitAmount > 0)
            }
            return true
        })
        .map((product) => {
            const price: Price = (product as any)?.prices?.find(
                (one: Price) => one.currency === pricesCurrency,
            )

            if (!price) {
                return null
            }

            if (product.billing_type !== billingInterval) {
                return null
            }

            return {
                price: price.unitAmount,
                limits: product.limits,
                productId: product.productId,
            }
        })
        .filter(Boolean)
    const [currentProductIndex, setCurrentProductIndex] = useState(-1)
    useEffect(() => {
        if (!ranges?.length) {
            return setCurrentProductIndex(-1)
        }
        setCurrentProductIndex(0)
    }, [ranges.length, billingInterval])
    const currentRange = ranges[currentProductIndex] || null
    const price = (() => {
        if (!currentRange) {
            return null
        }
        const p = currentRange?.price / 100
        return p
    })()

    const { fn: handlePricingClick, isLoading: clickIsLoading } = useThrowingFn(
        {
            fn: async () => {
                const productId = currentRange?.productId
                if (!productId) {
                    return
                }
                if (status !== 'authenticated' && promptLogin) {
                    return promptLogin()
                }

                if (!session?.user?.id) {
                    throw new Error('User ID is missing')
                }

                try {
                    if (subscription) {
                        await updatePlan({
                            subscriptionId: subscription.id,
                            planId: productId,
                        })
                        await new Promise((resolve) => setTimeout(resolve, 100))
                        await refetchSubscription()
                        return
                    }
                    return { skipToast: true }
                } finally {
                    if (onCheckout) {
                        await onCheckout({
                            productId: productId,
                            isChangePlan: Boolean(subscription),
                            email: session?.user?.email || '',
                            userId: session?.user?.id,
                        })
                    }
                }
            },
        },
    )
    const buttonText = (() => {
        if (subscription?.productId === currentRange?.productId) {
            return 'Current plan'
        }
        if (subscription) {
            return 'Change plan'
        }
        if (!session) {
            return 'Start free trial'
        }
        return 'Upgrade'
    })()

    const disabled =
        subscription?.productId === currentRange?.productId || isLoading
    // console.log({ currentRange })
    return (
        <PageContainer id='pricing' {...rest}>
            <FadedComponent
                {...(animate && {
                    cascade: true,
                    whenInView: true,
                    triggerOnce: true,
                })}
                className={classNames(
                    'w-full max-w-[900px] shadow-xl self-center rounded relative',
                    'px-12 p-8 mx-auto gap-6 flex-col flex bg-white',
                    'dark:bg-gray-800',
                    className,
                )}
            >
                <div className='flex flex-wrap gap-4 font-medium'>
                    {isLoading && <Spinner />}
                    <div className='flex items-start gap-8'>
                        {Object.keys(currentRange?.limits || {}).map((k, i) => {
                            let limit = currentRange?.limits[k]
                            if (typeof limit === 'number') {
                                limit = formatBigNumber(limit)
                            }
                            if (limit === false) {
                                return null
                            }
                            if (limit === true) {
                                limit = ''
                            }
                            return (
                                <div key={k + i} className='space-y-1'>
                                    <div className='opacity-80 truncate uppercase'>
                                        {k}
                                    </div>
                                    <div className='font-semibold text-3xl'>
                                        {limit}
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                    <div className='grow'></div>
                    <div className='space-y-1'>
                        <div className='opacity-80 text-right'>PRICE</div>
                        <div className='font-semibold text-3xl truncate'>
                            {'$'}
                            {price}{' '}
                            <span className='opacity-70 font-medium'>
                                {' / mo'}
                            </span>
                        </div>
                    </div>
                </div>
                {
                    <RangeSlider
                        value={currentProductIndex}
                        className='text-2xl'
                        onChange={(e) => {
                            const v = Number(e.target.value) ?? -1
                            // console.log({ v })
                            setCurrentProductIndex(v)
                        }}
                        min={0}
                        max={ranges?.length - 1}
                        step={1}
                    />
                }
                {allowYearlyBilling && (
                    <BillingIntervalSelect
                        {...{ billingInterval, setBillingInterval }}
                    />
                )}
                <div className='flex items-center gap-4'>
                    <div className='uppercase font-semibold text-sm opacity-80'>
                        {`what's included`}
                    </div>
                    <div className='grow border-t-2'></div>
                </div>
                <div className='grid grid-cols-3 gap-y-8 gap-x-8'>
                    {features.map((feature, i) => {
                        return (
                            <div
                                key={i}
                                className='flex gap-2 justify-center  items-center'
                            >
                                {i % 3 === 2 && <div className='grow' />}
                                <CheckCircleIcon className='h-5 dark:fill-green-300 fill-green-500' />
                                <div className='whitespace-pre'>{feature}</div>
                                {i % 3 === 0 && <div className='grow' />}
                            </div>
                        )
                    })}
                </div>
                <div className='flex mt-4 justify-center'>
                    {/* <div className='grow'></div> */}
                    <div className='space-y-2'>
                        {!hideUpgradeButton && (
                            <Button
                                aria-label='buy'
                                onClick={handlePricingClick}
                                disabled={disabled}
                                // bg='blue.500'
                                // bgDark='blue.200'
                                isLoading={clickIsLoading}
                                biggerOnHover
                                className='font-bold !px-6'
                            >
                                {buttonText}
                            </Button>
                        )}
                        {Boolean(trialDays) && !subscription && !session && (
                            <div className='opacity-70 text-center font-medium text-xs'>
                                {trialDays} days free trial
                            </div>
                        )}
                    </div>
                </div>
                {subscription && manageSubscriptionHandler ? (
                    <Link
                        className='mx-auto !mb-0'
                        onClick={(e) => {
                            e.preventDefault()
                            manageSubscriptionHandler()
                        }}
                        href={''}
                    >
                        Manage subscription
                    </Link>
                ) : (
                    <FadedComponent className='text-center mx-auto !mb-0 opacity-80 text-sm'>
                        Need more?{` `}
                        <Link
                            href={`mailto:${needMoreEmail}?subject=${encodeURIComponent(
                                'Need a custom plan',
                            )}`}
                        >
                            Contact me
                        </Link>
                    </FadedComponent>
                )}
            </FadedComponent>
        </PageContainer>
    )
}

function BillingIntervalSelect({ billingInterval, setBillingInterval }) {
    return (
        <div
            className={classNames(
                'relative self-center bg-gray-200 rounded-lg',
                'p-0.5 flex',
            )}
        >
            <button
                onClick={() => setBillingInterval('month')}
                type='button'
                className={classNames(
                    'whitespace-nowrap w-1/2 text-sm text-gray-700',
                    'rounded-lg relative py-2 font-medium sm:w-auto',
                    'sm:px-8 focus:z-10 focus:ring-2 focus:outline-none',
                    {
                        'bg-white border-gray-200 shadow-sm rounded-md text-gray-900':
                            billingInterval === 'month',
                        'bg-transparent': billingInterval !== 'month',
                    },
                )}
            >
                Monthly billing
            </button>
            <button
                onClick={() => setBillingInterval('year')}
                type='button'
                className={classNames(
                    'whitespace-nowrap w-1/2 text-sm text-gray-700',
                    'rounded-lg relative py-2 font-medium bg-white',
                    'sm:w-auto sm:px-8 focus:z-10 focus:ring-2 focus:outline-none',
                    {
                        'bg-white border-gray-200 shadow-sm rounded-md text-gray-900':
                            billingInterval === 'year',
                        'bg-transparent': billingInterval !== 'year',
                    },
                )}
            >
                Yearly billing
            </button>
        </div>
    )
}


import '@formatjs/intl-numberformat/polyfill'
import '@formatjs/intl-numberformat/locale-data/en'
import { RangeSlider } from './form'
function formatBigNumber(n: number) {
    const formatter = new Intl.NumberFormat('en-US', {
        // @ts-ignore
        compactDisplay: 'short',
        notation: 'compact',
    })
    return formatter.format(n)
}
