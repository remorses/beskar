import classNames from 'classnames'
import cs from 'classnames'
import React from 'react'
import { ComponentPropsWithoutRef, ReactNode } from 'react'
import { maxWidthWithPx } from '../utils'

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
    if (floatingElement) {
        dontContain = true
    }
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
                    'flex flex-col w-full min-w-0 h-auto items-stretch',
                    className,
                )}
                style={{
                    // margin: '0 auto',
                    position: floatingElement ? 'relative' : 'static',
                    maxWidth: maxWidthWithPx(),
                    ...style,
                }}
                {...rest}
            >
                {children}
            </div>
        </div>
    )
}

export function RootPageContainer({
    children,
    style = {},
    className = '',
    ...rest
}: ComponentPropsWithoutRef<'div'> & {}) {
    return (
        <div
            style={{ contain: 'paint' }}
            className={classNames(
                'relative min-h-full max-w-full items-stretch overflow-x-hidden',
                'flex-col flex space-y-[30px] md:space-y-[60px]',
                className,
            )}
            {...rest}
        >
            {children}
        </div>
    )
}
