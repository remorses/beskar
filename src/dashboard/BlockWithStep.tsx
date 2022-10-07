import classNames from 'classnames'

export function BlockWithStep({
    children,
    step,
    isLast = false,
    top = 32,

    className = '',
}) {
    return (
        <div
            className={classNames(
                'w-full space-y-4 relative py-8 px-8 max-w-xl items-stretch',
                'flex-col flex',
                className,
            )}
        >
            <div
                className={classNames(
                    'top-14 left-0 justify-center items-center font-medium',
                    'flex-col flex border bg-white absolute dark:bg-gray-700',
                )}
                style={{
                    height: 'calc(100% - ${top}px)',
                    display: isLast ? 'none' : 'block',
                }}
            ></div>
            <div
                className={classNames(
                    'w-4 shadow-lg rounded-full p-4 justify-center',
                    'items-center h-4 font-medium flex-col flex border',
                    'border bg-white absolute -left-4 !mt-0 dark:bg-gray-700',
                )}
                style={{ top }}
            >
                {step}
            </div>

            {children}
        </div>
    )
}
