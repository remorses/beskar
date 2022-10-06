import { Dialog } from '@headlessui/react'
import { createPortal } from 'react-dom'
import { Faded } from 'baby-i-am-faded'
import clsx from 'clsx'
import {
    ComponentPropsWithoutRef,
    CSSProperties,
    SVGProps,
    useEffect,
} from 'react'

Faded.defaultProps = {
    cascadeIncrement: 80,
    duration: 120,
}

export function Modal({
    as: As = 'div' as any,
    isOpen,
    onClose,
    className = '',
    content,
    disableAnimations = false,
    useDefaultContentStyle = false,
    initialFocus = null as any,
    maxWidth = '100%',
    keepScrollBar = false,
    style = {} as CSSProperties,
    ...rest
}) {
    useEffect(() => {
        if (keepScrollBar) {
            return
        }
        if (isOpen) {
            document.documentElement.style.overflow = 'hidden'
        } else {
            document.documentElement.style.overflow = ''
        }
    }, [isOpen])

    useEffect(() => {
        const handler = (event) => {
            if (event?.key?.toLowerCase() === 'escape') {
                event.preventDefault()
                onClose()
            }
        }
        document.addEventListener('keydown', handler)
        return () => {
            document.removeEventListener('keydown', handler)
        }
    }, [])

    const styles = (
        <style jsx global>{`
            @keyframes zoomIn {
                from {
                    opacity: 0;
                    transform: scale(1.1);
                }
                to {
                    opacity: 1;
                }
            }
            @keyframes simpleFade {
                from {
                    opacity: 0;
                }
                to {
                    opacity: 1;
                }
            }
        `}</style>
    )
    if (!isOpen) {
        return styles
    }

    return createPortal(
        <As
            className='fixed inset-0 z-[1000] overflow-y-auto overflow-x-hidden'
            {...rest}
        >
            {styles}
            <Faded
                disabled={disableAnimations}
                delay={800}
                duration={300}
                style={{
                    // transition:
                    //     'background 1s cubic-bezier(0.4, 0, 0.2, 1) !important',
                    backdropFilter: 'blur(12px)',
                    // @ts-ignore
                    '-webkit-backdrop-filter': 'blur(12px)',
                    background: 'rgba(0, 0, 0, 0.1)',
                }}
                onClick={(e) => {
                    onClose()
                    e.stopPropagation()
                }}
                animationName='simpleFade'
                className='fixed inset-0 bg-black bg-opacity-20'
            />

            <Faded
                duration={220}
                timingFunction='ease-in-out-quad'
                disabled={disableAnimations}
                animationName='zoomIn'
            >
                <div
                    style={{
                        ...style,
                        maxWidth: `min(${maxWidth}, 100vw - 100px)`,
                    }}
                    className={clsx(
                        'top-8 space-y-6 shadow-xl rounded-lg relative',
                        'mx-auto min-w-0 isolate bg-transparent lg:top-14',
                        className,
                    )}
                >
                    {useDefaultContentStyle ? (
                        <div
                            className={clsx(
                                'w-auto text-gray-700 space-y-8 rounded-lg ring-gray-100',
                                'ring-1 py-4 px-8 min-w-0 justify-center items-stretch',
                                'flex-col flex bg-white dark:text-gray-100 dark:ring-gray-700',
                                'dark:bg-gray-800',
                            )}
                        >
                            {content}
                        </div>
                    ) : (
                        content
                    )}
                </div>
            </Faded>
        </As>,
        document.body,
    )
}

export function CloseButton({
    className = '',
    ...rest
}: ComponentPropsWithoutRef<'button'> & { onClick: Function }) {
    return (
        <button
            className={clsx(
                'top-4 text-gray-600 shrink-0 rounded right-4',
                'p-1 bg-white/50 backdrop-blur appearance-none',
                'absolute dark:text-gray-400 dark:bg-gray-700/50',
                className,
            )}
            aria-label='Close'
            type='button'
            {...rest}
        >
            <RiCloseFill className='h-7 w-7' />
        </button>
    )
}

function RiCloseFill(props: SVGProps<SVGSVGElement>) {
    return (
        <svg width='1em' height='1em' viewBox='0 0 24 24' {...props}>
            <path
                fill='currentColor'
                d='m12 10.586l4.95-4.95l1.414 1.414l-4.95 4.95l4.95 4.95l-1.414 1.414l-4.95-4.95l-4.95 4.95l-1.414-1.414l4.95-4.95l-4.95-4.95L7.05 5.636z'
            ></path>
        </svg>
    )
}

Modal.CloseButton = CloseButton
