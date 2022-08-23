import { Spinner } from './Spinner'
import { CheckIcon } from '@heroicons/react/solid'
import { Faded } from 'baby-i-am-faded'
import classNames from 'classnames'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import NProgress from 'nprogress'
import React, {
    ComponentPropsWithoutRef,
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
    name: string
    trial_days: number
    billing_type: string // 'month' | 'year'
    paddleId: string
}

export type Price = {
    unitAmount: number
    currency: string
}

export type PricingProps = {
    products: (Product & { prices: Price[] })[]
    promptLogin?: () => void
    getSubscription: () => Promise<Subscription>
    updatePlan: (x: { subscriptionId: string; planId: string }) => Promise<any>
    isLoading?: boolean
    productDetails: {
        features?: string[]
        description?: string
        paddleId?: string
        contactLink?: string
    }[]
    animate?: boolean
    needMoreEmail?: string
    pricesCurrency?: string
    manageSubscriptionHref: string
    allowYearlyBilling?: boolean
    passthrough: () => any
    onCheckout?: (x: { isChangePlan; userId?: string }) => any
} & ComponentPropsWithoutRef<'div'>

// const getSubscriptionMemoized = memoize(getSubscription, { isPromise: true })

export function Pricing({
    products,
    animate = false,
    className = '',
    isLoading = false,
    onCheckout,
    promptLogin = () => {},
    updatePlan,
    getSubscription,
    productDetails,
    needMoreEmail,
    manageSubscriptionHref,
    pricesCurrency = 'USD',
    allowYearlyBilling = true,
    passthrough,
    ...rest
}: PricingProps) {
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

    return (
        <PageContainer
            id='pricing'
            style={{
                // @ts-ignore
                '--page-max-width': '100vw',
            }}
            className={classNames('relative self-center mx-auto', className)}
            {...rest}
        >
            {/* <Box
                    position='absolute'
                    backgroundImage='/landing-page/illustration-section-07.svg'
                    backgroundRepeat='no-repeat'
                    backgroundSize='auto'
                    backgroundPosition='center top'
                    height='100vh'
                    width='100vw'
                    top={-90}
                    left='-50%'
                    bottom={0}
                /> */}
            <div className='relative sm:flex sm:flex-col sm:align-center'>
                {allowYearlyBilling && (
                    <BillingIntervalSelect
                        {...{ billingInterval, setBillingInterval }}
                    />
                )}
            </div>
            <FadedComponent
                {...(animate && {
                    cascade: true,
                    whenInView: true,
                    triggerOnce: true,
                })}
                style={{ minHeight: '500px' }}
                className={classNames(
                    'relative flex flex-col items-center justify-center',
                    'mt-12 space-y-8 lg:mx-auto lg:items-stretch',
                    'lg:flex-row lg:space-x-6 lg:space-y-0',
                )}
            >
                {isLoading && <Spinner />}
                {!isLoading &&
                    products &&
                    products
                        .sort(
                            (a, b) =>
                                a?.prices?.find(
                                    (one) => one.currency === pricesCurrency,
                                )?.unitAmount! -
                                b?.prices?.find(
                                    (one) => one.currency === pricesCurrency,
                                )?.unitAmount!,
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
                            const details = productDetails.find(
                                (x) => x.paddleId === product.paddleId,
                            )

                            return (
                                <SubscriptionPlan
                                    passthrough={passthrough}
                                    key={product.name}
                                    description={details?.description}
                                    updatePlan={updatePlan}
                                    refetchSubscription={refetchSubscription}
                                    promptLogin={promptLogin}
                                    features={details?.features || []}
                                    contactUs={details?.contactLink}
                                    onCheckout={onCheckout}
                                    product={product}
                                    price={price}
                                    subscription={subscription}
                                />
                            )
                        })}
            </FadedComponent>
            <div className='h-[2em] mt-10 mb-12'>
                {subscription && manageSubscriptionHref ? (
                    <FadedComponent className='text-center '>
                        <Link href={manageSubscriptionHref}>
                            Manage subscription
                        </Link>
                    </FadedComponent>
                ) : (
                    !!needMoreEmail && (
                        <FadedComponent className='text-center opacity-80 text-sm '>
                            Need more?{` `}
                            <Link
                                href={`mailto:${needMoreEmail}?subject=${encodeURIComponent(
                                    'Need a custom plan',
                                )}`}
                            >
                                Contact me
                            </Link>
                        </FadedComponent>
                    )
                )}
            </div>
        </PageContainer>
    )
}

function BillingIntervalSelect({ billingInterval, setBillingInterval }) {
    return (
        <div
            className={classNames(
                'relative self-center mt-6 bg-gray-200 rounded-lg',
                'p-0.5 flex sm:mt-8',
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

function SubscriptionPlan({
    product,
    price,
    subscription,
    description,
    refetchSubscription,
    onCheckout,
    contactUs = '',
    features,
    promptLogin,
    updatePlan,
    style,
    passthrough,
}: {
    product: Product
    price: Price
    refetchSubscription: Function
    onCheckout: PricingProps['onCheckout']
    subscription?: Subscription
    description?: string
    updatePlan: PricingProps['updatePlan']
    contactUs?: string
    features: string[]
    passthrough
    promptLogin: () => void
} & ComponentPropsWithoutRef<'div'>) {
    const router = useRouter()
    const { status, data: session } = useSession()

    const { fn: changePlan, isLoading } = useThrowingFn({
        fn: updatePlan,
        errorMessage: 'Failed to update plan',
        successMessage: 'Updated plan!',
    })

    const handlePricingClick = async (paddleId: string) => {
        if (status !== 'authenticated' && promptLogin) {
            return promptLogin()
        }

        if (!session?.user?.id) {
            throw new Error('User ID is missing')
        }

        try {
            if (subscription) {
                // clear subscription cache
                // getSubscriptionMemoized.cache.keys.length = 0
                // getSubscriptionMemoized.cache.values.length = 0
                if (
                    !confirm(
                        'Changing plan will remove any existing coupons, continue?',
                    )
                ) {
                    return
                }

                await changePlan({
                    subscriptionId: subscription.paddleSubscriptionId,
                    planId: paddleId,
                })
                await new Promise((resolve) => setTimeout(resolve, 100))
                await refetchSubscription()
                return
            } else {
                NProgress.start()
                Paddle.Checkout.open({
                    product: paddleId,
                    email: session.user.email,
                    passthrough: JSON.stringify(passthrough()),
                    successCallback: () => {
                        toast.success('Created plan', {
                            position: 'top-center',
                        })
                        refetchSubscription()
                    },
                })
            }
        } finally {
            if (onCheckout) {
                onCheckout({
                    isChangePlan: Boolean(subscription),
                    userId: session?.user?.id,
                })
            }
        }
    }

    const alreadyUsingThisPlan = product.paddleId === subscription?.productId

    const buyMessage = useMemo(() => {
        if (price.unitAmount == 0) {
            return `Get started`
        }
        if (alreadyUsingThisPlan) {
            return 'Current plan'
        }
        if (!!product.trial_days) {
            return 'Start free trial'
        }
        if (subscription) {
            if (price.unitAmount > Number(subscription.unit_price) * 100) {
                return `Upgrade to ${product.name}`
            }
            return `Downgrade to ${product.name}`
        }
        return `Buy ${product.name}`
    }, [subscription, price])

    return (
        <div
            style={style}
            className={classNames(
                'border border-gray-200 rounded-lg shadow-sm',
                'divide-y divide-gray-200 bg-white max-w-sm w-[280px] xl:w-[310px]',
            )}
        >
            <div className='p-6 flex flex-col h-[300px]'>
                <h2 className='text-lg font-medium leading-6 text-gray-900'>
                    {product.name?.split('-')[0]}
                </h2>
                <p className='h-12 mt-4 text-sm font-medium tracking-wide text-gray-500'>
                    {description || '.'}
                </p>
                {contactUs ? (
                    <p className='mt-9 text-center text-lg text-gray-500'></p>
                ) : (
                    <p className='mt-8'>
                        <span className='text-4xl font-extrabold text-gray-900'>
                            $
                            {Number(
                                // if billing_type is year, divide the price by 12
                                product.billing_type === 'year'
                                    ? price.unitAmount / 12 / 100
                                    : price.unitAmount / 100,
                            ).toFixed(0)}
                        </span>{' '}
                        <span className='text-base font-medium text-gray-500'>
                            /mo
                        </span>
                    </p>
                )}
                <div className='flex-1'></div>
                {contactUs ? (
                    <BuyButton>
                        <a href={contactUs}>Contact</a>
                    </BuyButton>
                ) : (
                    <BuyButton
                        onClick={() => {
                            price.unitAmount == 0
                                ? promptLogin()
                                : handlePricingClick(product.paddleId)
                        }}
                        aria-label={`buy ${product.name}`}
                        disabled={alreadyUsingThisPlan}
                    >
                        {isLoading ? 'Loading...' : buyMessage}
                    </BuyButton>
                )}

                <div
                    className={classNames(
                        'text-xs text-center mt-3 font-medium text-gray-500',
                        'min-h-[1.2em]',
                    )}
                >
                    {!!product.trial_days && (
                        <span className=''>
                            {product.trial_days} days free trial
                        </span>
                    )}
                </div>
            </div>
            <div className='px-6 pt-6 pb-8'>
                <h3
                    className={classNames(
                        'text-sm font-medium tracking-wide text-gray-400',
                        'uppercase',
                    )}
                >
                    {"What's included"}
                </h3>
                <ul role='list' className='mt-6 space-y-4 text-sm font-medium'>
                    {features.map((feature) => (
                        <li key={feature} className='flex space-x-3'>
                            <CheckIcon
                                className='flex-shrink-0 w-5 h-5 text-emerald-600'
                                aria-hidden='true'
                            />
                            <span className='text-gray-600 '>{feature}</span>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}

function BuyButton({ children, disabled = false, ...rest }) {
    return (
        <button
            // variant='unstyled'
            className={classNames(
                'block w-full py-2 mt-8 text-sm font-semibold text-center',
                'text-white bg-gray-900 border border-black rounded-md',
                'hover:cursor-pointer active:bg-white active:text-black',
                disabled ? 'opacity-50 pointer-events-none' : '',
            )}
            {...rest}
        >
            {children}
        </button>
    )
}
