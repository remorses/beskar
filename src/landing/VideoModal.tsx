import clsx from 'clsx'
import { SVGProps, useState } from 'react'
import { useDisclosure } from '../utils'
import { Modal } from './Modal'
import { Spinner } from './Spinner'

export function VideoModal({
    youtubeVideoId,
    aspectRatio = 16 / 9,
    className = '',
    button = <PlayButton className='' />,
}) {
    const { isOpen, onClose, onOpen } = useDisclosure()
    const src = `https://www.youtube.com/embed/${youtubeVideoId}?vq=hd1080`
    const padding = (1 / aspectRatio) * 100
    const [isLoading, setIsLoading] = useState(true)
    return (
        <>
            <Modal
                className={'!max-w-full mx-2  md:mx-20 ' + className}
                content={
                    <div
                        className={clsx(
                            'flex bg-white/20 text-white w-full flex-col items-center justify-center',
                            'p-8 space-y-8',
                        )}
                    >
                        <Modal.CloseButton onClick={onClose} />

                        <div className='relative w-full max-h-[calc(80vh)]'>
                            <div style={{ paddingTop: padding + '%' }}></div>

                            <iframe
                                title={'video'}
                                src={src}
                                height='1080'
                                // width='1920'
                                frameBorder={0}
                                // loading='lazy'
                                allowFullScreen
                                allowTransparency
                                onLoad={() => setIsLoading(false)}
                                className='absolute bg-transparent rounded-lg inset-0 w-full h-full max-w-full'
                            />
                            <div
                                className={clsx(
                                    'absolute inset-0 flex items-center justify-center',
                                    isLoading ? 'block' : 'hidden',
                                )}
                            >
                                <Spinner className='text-5xl text-gray-600' />
                            </div>
                        </div>
                    </div>
                }
                isOpen={isOpen}
                onClose={onClose}
            ></Modal>
            <div onClick={onOpen} className=''>
                {button}
            </div>
        </>
    )
}

export function PlayButton({ className, ...props }: SVGProps<SVGSVGElement>) {
    return (
        <button className='appearance-none '>
            <svg
                viewBox='0 0 24 24'
                className={clsx(
                    'h-28 hover:scale-110 transition-transform ',
                    className,
                )}
                {...props}
            >
                <path
                    fill='currentColor'
                    d='M9.525 18.025q-.5.325-1.013.037Q8 17.775 8 17.175V6.825q0-.6.512-.888q.513-.287 1.013.038l8.15 5.175q.45.3.45.85t-.45.85Z'
                ></path>
            </svg>
        </button>
    )
}

VideoModal.PLayButton = PlayButton
