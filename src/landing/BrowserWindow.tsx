import classNames from 'classnames'

export function BrowserWindow({
    children,
    className = '',
    host = 'example.com',
}) {
    const dot = (
        <span
            className={classNames(
                'rounded-full bg-gray-500 dark:bg-gray-600 w-[0.5em]',
                'h-[0.5em]',
            )}
        />
    )
    return (
        <figure
            className={classNames(
                'rounded-b-md relative max-w-full h-auto z-[1]',
                'shadow-[0_2.75rem_3.5rem_-2rem_rgb(45_55_75_/_20%),_0_0_5rem_-2rem_rgb(45_55_75_/_15%)]',
                'dark:shadow-[0_2.75rem_3.5rem_-2rem_rgb(0_0_0_/_20%),_0_0_5rem_-2rem_rgb(0_0_0_/_15%)]',
                'text-xs',
                className,
            )}
        >
            <div
                className={classNames(
                    'rounded-t-md relative py-[0.6em] px-24 items-center',
                    'flex bg-gray-800 dark:bg-gray-700',
                )}
            >
                <div
                    className={classNames(
                        'top-0 left-4 items-center h-full flex absolute',
                        'gap-[0.5em]',
                    )}
                >
                    {dot}
                    {dot}
                    {dot}
                </div>
                {host && (
                    <div
                        className={classNames(
                            'w-full truncate text-gray-400 leading-none justify-center',
                            'items-center h-full flex bg-gray-700 dark:text-gray-400',
                            'dark:bg-gray-600',
                        )}
                    >
                        {host}
                    </div>
                )}
            </div>
            <div className='rounded-b-md flex flex-col overflow-hidden'>
                {children}
            </div>
        </figure>
    )
}
