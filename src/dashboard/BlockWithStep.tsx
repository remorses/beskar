import classNames from 'classnames'

export function BlockWithStep({
    children,
    step,
    isLast = false,
    className = '',
}) {
    return (
        <div
            className={classNames(
                'relative flex flex-col max-w-xl py-8 px-10 w-full items-stretch space-y-4',
                // isActive ? '' : 'opacity-50',
                className,
            )}
        >
            <div
                className={classNames(
                    'border flex flex-col items-center justify-center',
                    'font-medium left-0 top-14 bg-white dark:bg-gray-700 absolute',
                    isLast ? 'h-1' : 'h-full',
                )}
            ></div>
            <div
                className={classNames(
                    'border rounded-full p-4 w-4 h-4 flex flex-col items-center',
                    'justify-center font-medium shadow-lg -left-4',
                    'top-8 bg-white dark:bg-gray-700 absolute border',
                )}
            >
                {step}
            </div>

            {children}
        </div>
    )
}
