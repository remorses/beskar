
import { Faded } from 'baby-i-am-faded'
import clsx from 'clsx'

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
        <div
            className={clsx(
                'flex flex-col justify-between items-center space-y-14',
                'px-6 md:flex-row md:space-y-0',
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
                            className='max-w-[140px] max-h-[40px]'
                        />
                    </LinkOrNot>
                )
            })}
        </div>
    )
}
