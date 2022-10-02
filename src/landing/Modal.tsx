import { Dialog } from '@headlessui/react'
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
    as: As = 'div',
    isOpen,
    onClose,
    className = '',
    content,
    useDefaultContentStyle = false,
    initialFocus = null as any,
    maxWidth = '100%',
    style = {} as CSSProperties,
    ...rest
}) {
    
    useEffect(() => {
        console.log('Modal mounted', document.documentElement.style.overflow)
        if (isOpen) return
        document.documentElement.style.overflow = ''
    }, [isOpen])

    return (
        <Dialog
            className='fixed inset-0 z-10 overflow-y-auto'
            open={isOpen}
            as={As as any}
            onClose={onClose}
            initialFocus={initialFocus}
            {...rest}
        >
            <Dialog.Overlay
                as={Faded}
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
            <style jsx>{`
                @keyframes zoomIn {
                    from {
                        opacity: 0;
                        transform: scale(0.96);
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
            <Faded
                duration={220}
                timingFunction='ease-in-out-quad'
                animationName='zoomIn'
            >
                <Dialog.Panel
                    style={{
                        ...style,
                        maxWidth: `min(${maxWidth}, 100vw - 100px)`,
                    }}
                    className={clsx(
                        'top-8 space-y-6 shadow-xl rounded-lg ',
                        'relative mx-auto min-w-0',
                        'isolate bg-transparent lg:top-14 ',

                        className,
                    )}
                >
                    {useDefaultContentStyle ? (
                        <div
                            className={clsx(
                                'w-auto  text-gray-700 space-y-8 py-4 px-8 min-w-0',
                                'justify-center items-stretch flex-col flex bg-white',
                                'dark:text-gray-100 dark:bg-gray-800',
                                'ring-gray-100 rounded-lg ring-1 dark:ring-gray-700',
                            )}
                        >
                            {content}
                        </div>
                    ) : (
                        content
                    )}
                </Dialog.Panel>
            </Faded>
        </Dialog>
    )
}

export function CloseButton({
    className = '',
    ...rest
}: ComponentPropsWithoutRef<'button'> & { onClick: Function }) {
    return (
        <button
            className={clsx(
                'top-4 shrink-0 text-gray-600 rounded right-4 p-1 bg-white/50',
                'backdrop-blur appearance-none absolute dark:text-gray-400',
                'dark:bg-gray-700/50',
                className,
            )}
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
