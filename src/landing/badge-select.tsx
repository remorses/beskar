import classNames from 'classnames'
import { ReactNode } from 'react'

export function BadgeSelect({
    options,
    selected,
    onChange,
}: {
    options: { value: string; name: ReactNode }[]
    selected: string
    onChange: (option: string) => void
}) {
    return (
        <div className='relative inline-flex items-center space-x-1'>
            {options.map((option) => (
                <button
                    key={option.value}
                    className={`${
                        option.value === selected
                            ? 'bg-white dark:bg-gray-700'
                            : '  dark:hover:bg-gray-800 '
                    } px-2 sm:px-3 py-1 rounded-md text-sm font-medium capitalize active:scale-95 transition-all duration-150`}
                    onClick={() => onChange(option.value)}
                >
                    {option.name || option.value}
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
