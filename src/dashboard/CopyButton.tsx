import { CheckIcon } from '@heroicons/react/solid'
import classNames from 'classnames'
import React, { CSSProperties } from 'react'

export const CopyButton = ({
    text,
    style = {} as CSSProperties,
    size = 18,
    children,
    className = '',
    ...props
}) => {
    const { hasCopied, copy } = useCopyToClipboard(text)
    const As: any = hasCopied ? CheckIcon : CopyIcon
    return (
        <button
            className={classNames(
                'text-sm shrink-0 items-center gap-1 font-medium',
                'flex cursor-pointer rounded hover:bg-gray-100 dark:hover:bg-gray-700 px-1 appearance-none',
                className,
            )}
            type='button'
            onClick={copy}
            {...props}
        >
            <As style={{ ...style, width: size, height: size }} />
            {hasCopied ? <div className='opacity-0'>{children}</div> : children}
        </button>
    )
}

export const useCopyToClipboard = (text: string) => {
    const copyToClipboard = (str: string) => {
        const el = document.createElement('textarea')
        el.value = str
        el.setAttribute('readonly', '')
        el.style.position = 'absolute'
        el.style.left = '-9999px'
        document.body.appendChild(el)
        const selection = document.getSelection()
        if (!selection) {
            return false
        }
        const selected =
            selection.rangeCount > 0 ? selection.getRangeAt(0) : false
        el.select()
        const success = document.execCommand('copy')
        document.body.removeChild(el)
        if (selected) {
            selection.removeAllRanges()
            selection.addRange(selected)
        }
        return success
    }

    const [copied, setCopied] = React.useState(false)

    const copy = React.useCallback(() => {
        if (!copied) setCopied(copyToClipboard(text))
    }, [text])
    React.useEffect(() => {
        const id = setTimeout(() => setCopied(false), 1000)
        return () => {
            clearTimeout(id)
        }
    }, [copied])
    React.useEffect(() => () => setCopied(false), [text])
    return { hasCopied: copied, copy }
}

function CopyIcon({ ...rest }) {
    return (
        <svg
            xmlns='http://www.w3.org/2000/svg'
            className='w-5 h-5'
            viewBox='0 0 20 20'
            fill='currentColor'
            {...rest}
        >
            <path d='M7 9a2 2 0 012-2h6a2 2 0 012 2v6a2 2 0 01-2 2H9a2 2 0 01-2-2V9z' />
            <path d='M5 3a2 2 0 00-2 2v6a2 2 0 002 2V5h8a2 2 0 00-2-2H5z' />
        </svg>
    )
}
