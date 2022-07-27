import { Spinner } from './Spinner'
import { CheckCircleIcon, CheckIcon } from '@heroicons/react/solid'
import { Faded } from 'baby-i-am-faded'
import classNames from 'classnames'
import { useSession } from 'next-auth/react'
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

export type Subscription = {
    paddleSubscriptionId: string
    productId: string
    unit_price: string // float number
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
    getSubscription: () => Promise<Subscription>
    updatePlan: (x: { subscriptionId: string; planId: string }) => Promise<any>
    isLoading?: boolean
    animate?: boolean
    pricesCurrency?: string
    manageSubscriptionHref: string
    allowYearlyBilling?: boolean
    onCheckout?: (x: { isChangePlan; userId?: string }) => any
} & ComponentPropsWithoutRef<'div'>

// const getSubscriptionMemoized = memoize(getSubscription, { isPromise: true })

export function PricingSlider({
    products = [],
    animate = false,
    className = '',
    isLoading = false,
    onCheckout,
    promptLogin = () => {},
    updatePlan,
    getSubscription,
    features,
    manageSubscriptionHref,
    pricesCurrency = 'USD',
    allowYearlyBilling = true,
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
    // console.log(ranges)
    return (
        <PageContainer
            id='pricing'
            className={classNames(
                'relative self-center px-4 mx-auto',
                className,
            )}
            {...rest}
        >
            <FadedComponent
                {...(animate && {
                    cascade: true,
                    whenInView: true,
                    triggerOnce: true,
                })}
                className={classNames(
                    'border bg-white shadow-xl dark:bg-gray-800 p-12 rounded gap-6 flex flex-col w-full',
                )}
            >
                {isLoading && <Spinner />}
                <div className='flex gap-4 font-medium'>
                    <div className='flex items-start gap-8'>
                        {Object.keys(currentRange?.limits || {}).map((k, i) => {
                            return (
                                <div key={k + i} className='space-y-1'>
                                    <div className='opacity-80 uppercase'>
                                        {k}
                                    </div>
                                    <div className='font-semibold text-3xl'>
                                        {currentRange?.limits[k]}
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                    <div className='grow'></div>
                    <div className='space-y-1'>
                        <div className='opacity-80 text-right'>PRICE</div>
                        <div className='font-semibold text-3xl'>
                            {'$'}
                            {price} {' / mo'}
                        </div>
                    </div>
                </div>
                {
                    <RangeSlider
                        value={currentProductIndex}
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
                        what's included
                    </div>
                    <div className='grow border-t-2'></div>
                </div>
                <div className='grid grid-cols-3 gap-y-8 gap-x-8'>
                    {features.map((feature, i) => {
                        return (
                            <div key={i} className='flex gap-2 items-center'>
                                <CheckCircleIcon className='h-5 dark:fill-green-300 fill-green-500' />
                                <div className=''>{feature}</div>
                            </div>
                        )
                    })}
                </div>
                {subscription && manageSubscriptionHref && (
                    <FadedComponent className='text-center mt-10'>
                        <Link href={manageSubscriptionHref}>
                            Manage subscription
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
                    'relative w-1/2 py-2 text-sm font-medium text-gray-700',
                    'whitespace-nowrap rounded-lg sm:px-8 sm:w-auto',
                    'focus:z-10 focus:ring-2 focus:outline-none',
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
                    'relative w-1/2 bg-white py-2 text-sm font-medium',
                    'text-gray-700 whitespace-nowrap rounded-lg',
                    'sm:px-8 sm:w-auto focus:z-10 focus:ring-2 focus:outline-none',
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

export function RangeSlider({ min, max, bg = '#388bd2', step, ...rest }) {
    return (
        <div>
            {/* <label
                    htmlFor='steps-range'
                    className='block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300'
                >
                    Range steps
                </label> */}
            <input
                type='range'
                min={min}
                max={max}
                step={step}
                className='range px-3'
                {...rest}
            />
            <style jsx>
                {`
                    input[type='range'] {
                        -moz-appearance: none;
                        -webkit-appearance: none;
                        background: #eef1f64d;

                        border-radius: 3px;
                        height: 6px;
                        width: 100%;
                        margin-top: 15px;
                        margin-bottom: 15px;
                        outline: 0;
                    }

                    input[type='range']::-webkit-slider-thumb {
                        appearance: none;
                        // TODO
                        box-shadow: 0 0 40px rgba(0, 0, 0, 0.1);
                        -webkit-appearance: none;
                        background-color: ${bg};
                        background-image: url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20width%3D%2212%22%20height%3D%228%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cpath%20d%3D%22M8%20.5v7L12%204zM0%204l4%203.5v-7z%22%20fill%3D%22%23FFFFFF%22%20fill-rule%3D%22nonzero%22%2F%3E%3C%2Fsvg%3E');
                        background-position: center;
                        background-repeat: no-repeat;
                        border-radius: 50%;
                        cursor: pointer;
                        height: 36px;
                        width: 36px;
                    }

                    input[type='range']::-moz-range-thumb {
                        background-color: ${bg};
                        background-image: url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20width%3D%2212%22%20height%3D%228%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cpath%20d%3D%22M8%20.5v7L12%204zM0%204l4%203.5v-7z%22%20fill%3D%22%23FFFFFF%22%20fill-rule%3D%22nonzero%22%2F%3E%3C%2Fsvg%3E');
                        background-position: center;
                        background-repeat: no-repeat;
                        border: 0;
                        border: 0;
                        border-radius: 50%;
                        cursor: pointer;
                        height: 36px;
                        width: 36px;
                    }

                    input[type='range']::-ms-thumb {
                        background-color: ${bg};
                        background-image: url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20width%3D%2212%22%20height%3D%228%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cpath%20d%3D%22M8%20.5v7L12%204zM0%204l4%203.5v-7z%22%20fill%3D%22%23FFFFFF%22%20fill-rule%3D%22nonzero%22%2F%3E%3C%2Fsvg%3E');
                        background-position: center;
                        background-repeat: no-repeat;
                        border: 0;
                        border-radius: 50%;
                        cursor: pointer;
                        height: 36px;
                        width: 36px;
                    }

                    input[type='range']::-moz-focus-outer {
                        border: 0;
                    }
                `}
            </style>
        </div>
    )
}
