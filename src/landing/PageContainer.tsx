import classNames from 'classnames'
import cs from 'classnames'
import React from 'react'
import { ComponentPropsWithoutRef, ReactNode } from 'react'

export function PageContainer({
    children,
    floatingElement = null as ReactNode,
    style = {},
    dontContain = false,
    className = '',
    ...rest
}: ComponentPropsWithoutRef<'div'> & {
    floatingElement?: ReactNode
    dontContain?: boolean
}) {
    return (
        <div
            style={{ contain: dontContain ? 'initial' : 'paint' }}
            className={classNames(
                'w-full max-w-full relative flex flex-col items-center ',
            )}
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
                    // TODO i am using px to add margin to all landing blocks and disable in lg because in lg it's impossible for blocks to touch page margins, is it ok?
                    'flex px-3 md:px-6 lg:px-0 flex-col w-full min-w-0 h-auto items-stretch',
                    className,
                )}
                style={{
                    // margin: '0 auto',
                    position: floatingElement ? 'relative' : 'static',
                    maxWidth: 'var(--page-max-width, 1200px)',
                    ...style,
                }}
                {...rest}
            >
                {children}
            </div>
        </div>
    )
}
