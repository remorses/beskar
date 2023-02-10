import { ComponentPropsWithoutRef, ReactNode, SVGProps } from 'react'
import { useDisclosure } from '../utils'

type Props = {
    heading: ReactNode
    content: ReactNode
    initialIsOpen?: boolean
    pl?: string
    remount?: boolean
} & ComponentPropsWithoutRef<'div'>

export function ToggleButton({
    heading,
    content,
    remount = false,
    pl = '24px',
    className = '',
    initialIsOpen = false,
    ...rest
}: Props) {
    const { isOpen, toggle } = useDisclosure(initialIsOpen)

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
            {(!remount || isOpen) && (
                <div
                    style={{
                        display: isOpen ? 'block' : 'none',
                        paddingLeft: pl,
                    }}
                    className='whitespace-pre-wrap leading-relaxed'
                >
                    {content}
                </div>
            )}
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
