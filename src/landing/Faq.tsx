import classNames from 'classnames'
import { ReactNode, SVGProps } from 'react'
import { useDisclosure } from '../utils'
import { PageContainer } from './PageContainer'

export function Accordion({ children, className, ...rest }) {
    return (
        <PageContainer
            className={classNames(
                'section dark:text-gray-100 py-20',
                className,
            )}
            {...rest}
        >
            <div className=''>
                <div className='has-mw-4xl mx-auto'>
                    <ul className='space-y-6'>{children}</ul>
                </div>
            </div>
        </PageContainer>
    )
}

function AccordionItem({ heading, content }) {
    const { toggle, isOpen } = useDisclosure()
    const Icon = isOpen
        ? MaterialSymbolsKeyboardArrowUpRounded
        : MaterialSymbolsKeyboardArrowDownRounded
    return (
        <li className='flex flex-col shadow-sm space-y-4 backdrop-blur rounded dark:bg-gray-900/40 border p-6 '>
            <div onClick={toggle} className='cursor-pointer flex items-center'>
                <div className='text-xl font-medium'>{heading}</div>
                <div className='flex-auto'></div>
                <button onClick={toggle} className='rounded'>
                    <Icon className='w-6 h-6' />
                </button>
            </div>
            <div className={classNames('block', isOpen ? '' : 'hidden')}>
                <div
                    className={classNames(
                        'block whitespace-pre-wrap opacity-90 leading-relaxed',
                    )}
                >
                    
                    {content}
                </div>
            </div>
        </li>
    )
}

type FaqItem = {
    heading: ReactNode
    content: ReactNode
}

export const Faq = ({
    items,
    className,
}: {
    items: FaqItem[]
    className?: string
}) => (
    <PageContainer>
        <Accordion className={className}>
            {items.map((item, i) => {
                return (
                    <AccordionItem {...item} key={`item-${i}`}></AccordionItem>
                )
            })}
        </Accordion>
    </PageContainer>
)

function MaterialSymbolsKeyboardArrowDownRounded(
    props: SVGProps<SVGSVGElement>,
) {
    return (
        <svg width='1em' height='1em' viewBox='0 0 24 24' {...props}>
            <path
                fill='currentColor'
                d='M12 14.975q-.2 0-.387-.075q-.188-.075-.313-.2l-4.6-4.6q-.275-.275-.275-.7q0-.425.275-.7q.275-.275.7-.275q.425 0 .7.275l3.9 3.9l3.9-3.9q.275-.275.7-.275q.425 0 .7.275q.275.275.275.7q0 .425-.275.7l-4.6 4.6q-.15.15-.325.212q-.175.063-.375.063Z'
            ></path>
        </svg>
    )
}

function MaterialSymbolsKeyboardArrowUpRounded(props: SVGProps<SVGSVGElement>) {
    return (
        <svg width='1em' height='1em' viewBox='0 0 24 24' {...props}>
            <path
                fill='currentColor'
                d='M6.7 14.7q-.275-.275-.275-.7q0-.425.275-.7l4.6-4.6q.15-.15.325-.213q.175-.062.375-.062t.388.075q.187.075.312.2l4.6 4.6q.275.275.275.7q0 .425-.275.7q-.275.275-.7.275q-.425 0-.7-.275L12 10.8l-3.9 3.9q-.275.275-.7.275q-.425 0-.7-.275Z'
            ></path>
        </svg>
    )
}
