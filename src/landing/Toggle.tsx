import { ComponentPropsWithoutRef, ReactNode, SVGProps } from 'react'
import { useDisclosure } from '../utils'

type Props = {
    heading: ReactNode
    content: ReactNode
} & ComponentPropsWithoutRef<'div'>

export function ToggleButton({
    heading,
    content,
    className = '',
    ...rest
}: Props) {
    const { isOpen, toggle } = useDisclosure()

    return (
        <div className={className} {...rest}>
            <button
                type='button'
                className='flex items-center appearance-none font-medium space-x-2 py-1'
                onClick={toggle}
            >
                <Icon
                    style={{
                        transform: isOpen ? 'rotate(90deg)' : '',
                        width: '14px',
                        height: '14px',
                    }}
                />
                <div className=''>{heading}</div>
            </button>
            <div
                style={{ display: isOpen ? 'block' : 'none' }}
                className='whitespace-pre-wrap opacity-70 pl-6 leading-relaxed'
            >
                {content}
            </div>
        </div>
    )
}

export function Icon(props: SVGProps<SVGSVGElement>) {
    return (
        <svg width='1em' height='1em' viewBox='0 0 24 24' {...props}>
            <path fill='currentColor' d='M8 5v14l11-7z'></path>
        </svg>
    )
}
