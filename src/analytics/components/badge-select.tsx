import classNames from 'classnames'

export function BadgeSelect({
    options,
    selected,
    onChange,
}: {
    options: string[]
    selected: string
    onChange: (option: string) => void
}) {
    return (
        <div className='relative inline-flex items-center space-x-3'>
            {options.map((option) => (
                <button
                    key={option}
                    className={`${
                        option === selected
                            ? 'bg-white dark:bg-gray-700'
                            : ' hover:bg-gray-50 dark:hover:bg-gray-800 '
                    } px-2 sm:px-3 py-1 rounded-md text-sm font-medium capitalize active:scale-95 transition-all duration-75`}
                    onClick={() => onChange(option)}
                >
                    {option}
                </button>
            ))}
        </div>
    )
}

function BadgeSelectContainer({ className = '', ...rest }) {
    return (
        <div
            className={classNames(
                'px-1 py-1 rounded-md border bg-gray-200 dark:bg-gray-900 border-gray-100 dark:border-gray-600',
                className,
            )}
            {...rest}
        />
    )
}

BadgeSelectContainer.displayName = 'BadgeSelectContainer'

BadgeSelect.Container = BadgeSelectContainer
