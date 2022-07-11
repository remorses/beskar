import classNames from 'classnames'
import cs from 'classnames'
import { ComponentPropsWithoutRef, ReactNode } from 'react'

export function PageContainer({
    children,
    floatingElement = null as ReactNode,
    style = {},
    className = '',
    ...rest
}: ComponentPropsWithoutRef<'div'> & { floatingElement?: ReactNode }) {
    return (
        <div
            className={classNames('w-full relative flex flex-col items-center')}
        >
            {floatingElement && (
                <div
                    className={cs(
                        'absolute flex flex-col items-center justify-center',
                        'w-full z-0 inset-0',
                        // `overflow-x-hidden`, // TODO maybe i need to set overflow x hidden for mobile
                    )}
                >
                    {floatingElement}
                </div>
            )}
            <div
                className={classNames(
                    'flex px-6 flex-col w-full min-w-0 h-auto items-stretch',
                    className,
                )}
                style={{
                    // margin: '0 auto',
                    position: floatingElement ? 'relative' : 'static',
                    maxWidth: 'var(--max-width, 1100px)',
                    contain: floatingElement ? 'initial' : 'paint',
                    ...style,
                }}
                {...rest}
            >
                {children}
            </div>
        </div>
    )
}
