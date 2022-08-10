import { ComponentPropsWithoutRef, ReactNode, SVGProps } from 'react'
import { useDisclosure } from '../utils'

type Props = {
    heading: ReactNode
    content: ReactNode
    pl?: string
} & ComponentPropsWithoutRef<'div'>

export function ToggleButton({
    heading,
    content,
    pl = '24px',
    className = '',
    ...rest
}: Props) {
    const { isOpen, toggle } = useDisclosure()

    return (
        <div className={className} {...rest}>
            <button
                type='button'
                className='appearance-none font-medium space-x-2 text-left py-1'
                onClick={toggle}
            >
                <Icon
                    style={{
                        transform: isOpen ? 'rotate(90deg)' : '',
                        width: '14px',
                        height: '14px',
                        marginBottom: '2px',
                        display: 'inline',
                    }}
                />
                <span className='[&>*]:inline'>{heading}</span>
            </button>
            <div
                style={{ display: isOpen ? 'block' : 'none', paddingLeft: pl }}
                className='whitespace-pre-wrap opacity-70 leading-relaxed'
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
