import clsx from 'clsx'
import { useDisclosure } from '../utils'
import { Modal } from './Modal'
import { Spinner } from './Spinner'

export function VideoModal({
    youtubeVideoId,
    aspectRatio = 16 / 9,
    className = '',
    button,
}) {
    const { isOpen, onClose, onOpen } = useDisclosure()
    const src = `https://www.youtube.com/embed/${youtubeVideoId}`
    const padding = (1 / aspectRatio) * 100
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

                        <div className='relative w-full'>
                            <div style={{ paddingTop: padding + '%' }}></div>
                            <div className='absolute inset-0 flex items-center justify-center'>
                                <Spinner className='text-5xl' />
                            </div>
                            <iframe
                                title={'video'}
                                src={src}
                                frameBorder={0}
                                loading='lazy'
                                allow='autoplay; fullscreen'
                                allowFullScreen
                                className='absolute rounded-lg inset-0 w-full h-full max-w-full'
                            />
                        </div>
                    </div>
                }
                isOpen={isOpen}
                onClose={onClose}
            ></Modal>
            <div onClick={onOpen} className='cursor-pointer'>
                {button}
            </div>
        </>
    )
}
