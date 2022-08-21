import { Faded } from 'baby-i-am-faded'
import clsx from 'clsx'
import { PageContainer } from './PageContainer'

type Props = {
    items: {
        src: string
        href?: string
        opacity: number
    }[]
    className?: string
    invert?: boolean
}
export function TestimonialLogos({ items, invert = false, className }: Props) {
    return (
        <PageContainer>
            <div
                className={clsx(
                    'flex flex-col justify-around flex-1 items-center ',
                    'md:flex-row gap-14',
                    className,
                )}
            >
                {items.map((x) => {
                    const LinkOrNot = x.href ? 'a' : 'div'
                    return (
                        <LinkOrNot
                            key={x.src}
                            style={{
                                opacity: x.opacity,
                                ...(invert && { filter: 'invert()' }),
                            }}
                            {...(x.href && {
                                href: x.href || '',
                                target: '_blank',
                            })}
                            className='block appearance-none'
                        >
                            <img
                                src={x.src}
                                alt='logo'
                                className='max-w-[180px] max-h-[40px]'
                            />
                        </LinkOrNot>
                    )
                })}
            </div>
        </PageContainer>
    )
}
