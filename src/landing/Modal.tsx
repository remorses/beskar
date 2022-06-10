import { Dialog } from '@headlessui/react'
import { Faded } from 'baby-i-am-faded'
import clsx from 'clsx'
import { ComponentPropsWithoutRef, SVGProps } from 'react'

export function Modal({ isOpen, onClose, className = '', content }) {
    return (
        <Dialog
            className='fixed inset-0 z-10 overflow-y-auto'
            open={isOpen}
            onClose={onClose}
        >
            <Dialog.Overlay
                as={Faded}
                style={{
                    transition:
                        'background 0.3s cubic-bezier(0.4, 0, 0.2, 1) !important',
                    backdropFilter: 'saturate(180%) blur(12px)',
                    // @ts-ignore
                    '-webkit-backdrop-filter': 'saturate(180%) blur(12px)',
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
                        transform: scale3d(0.3, 0.3, 0.3);
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
            <Dialog.Panel
                as={Faded}
                cascade
                animationName='zoomIn'
                className={clsx(
                    'relative max-w-3xl mx-auto overflow-hidden bg-transparent',
                    'rounded-lg shadow top-8 isolate lg:top-14',
                    className,
                )}
            >
                {content}
            </Dialog.Panel>
        </Dialog>
    )
}

export function CloseButton({
    className = '',
    ...rest
}: ComponentPropsWithoutRef<'button'>) {
    return (
        <button
            className={clsx(
                'appearance-none rounded opacity-70 absolute top-4 right-4',
                className,
            )}
            {...rest}
        >
            <RiCloseFill className='h-8 w-8' />
        </button>
    )
}

Modal.CloseButton = CloseButton

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
