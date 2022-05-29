import cs from 'classnames'
export function Bullet({ children }) {
    return (
        <div
            className={cs(
                'max-w-max tracking-wider text-xs rounded truncate',
                'px-2 font-semibold bg-gray-600/20 py-[4px] dark:bg-gray-100/20',
            )}
        >
            {children}
        </div>
    )
}
