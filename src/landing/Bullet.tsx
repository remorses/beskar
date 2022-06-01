import cs from 'classnames'
export function Bullet({ children }) {
    return (
        <div
            className={cs(
                'max-w-max tracking-wider text-xs rounded truncate',
                'px-2 font-semibold bg-gray-600/10 py-[4px] dark:bg-white/10',
            )}
        >
            {children}
        </div>
    )
}
