import clsx from 'clsx'

export function InlineCode({ className = '', ...rest }) {
    return (
        <code
            className={clsx(
                'text-red-500 dark:text-red-400 tracking-wide font-medium bg-gray-200',
                'mx-1 py-px px-1 rounded text-[85%] ',
                'dark:bg-gray-900/70',
                className,
            )}
            {...rest}
        />
    )
}
