import cs from 'classnames'
import { ReactNode } from 'react'

export function PageContainer({
    children,
    floatingElement = null as ReactNode,
    style = {},
    ...rest
}) {
    return (
        <div className='w-full relative flex flex-col items-center'>
            {floatingElement && (
                <div
                    className={cs(
                        'absolute flex flex-col items-center justify-center',
                        'w-full z-0 inset-0',
                    )}
                >
                    {floatingElement}
                </div>
            )}
            <div
                className='flex px-6 lg:px-0 flex-col w-full items-stretch'
                style={{
                    // margin: '0 auto',
                    position: floatingElement ? 'relative' : 'static',
                    maxWidth: 'var(--max-width, 1200px)',
                    ...style,
                }}
                {...rest}
            >
                {children}
            </div>
        </div>
    )
}
