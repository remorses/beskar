import classNames from 'classnames'
import React from 'react'

export function KeyAbbr({
    className = '',
    children = '',
    isMetaKey = false,
    ...rest
}) {
    const actionKey = useActionKey(isMetaKey)
    return (
        <abbr
            className={classNames(
                'rounded py-px no-underline',
                'leading-tight font-mono font-bold border-gray-300',
                'border bg-gray-100 appearance-none dark:border-0',
                'dark:bg-gray-700 px-[5px]',
                className,
            )}
            children={isMetaKey ? actionKey[0] : children}
            {...rest}
        />
    )
}

const ACTION_KEY_DEFAULT = ['Ctrl', 'Control']
const ACTION_KEY_APPLE = ['⌘', 'Command']

function useActionKey(enable = false) {
    const [actionKey, setActionKey] = React.useState<string[]>(ACTION_KEY_APPLE)
    React.useEffect(() => {
        if (!enable) return
        if (typeof navigator === 'undefined') return
        const isMac = /(Mac|iPhone|iPod|iPad)/i.test(navigator.platform)
        if (!isMac) {
            setActionKey(ACTION_KEY_DEFAULT)
        }
    }, [])
    return actionKey
}
