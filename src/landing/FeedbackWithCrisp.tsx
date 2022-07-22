import clsx from 'clsx'
import { ComponentPropsWithoutRef } from 'react'
import { Button } from './Button'

declare global {
    var $crisp: any
}

export function FeedbackWithCrisp({
    children,
    useDefaultComponent,
    className = '',
    ...rest
}: ComponentPropsWithoutRef<'div'> & {
    useDefaultComponent?: boolean
}) {
    if (useDefaultComponent) {
        children = <Button ghost>Feedback</Button>
    }
    return (
        <div
            onClick={() => {
                if (typeof $crisp === 'undefined') {
                    console.warn(
                        `FeedbackWithCrisp has not found $crisp variable`,
                    )
                    return
                }
                $crisp.push([
                    'set',
                    'message:text',
                    ["Hi! I have some feedback: "],
                ])
                // $crisp.push(["set", "session:data", [[["user-bill-amount", "$200"]]]]);
                $crisp.push(['set', 'session:event', [[['feedback']]]])
                $crisp.push(['do', 'chat:open'])
            }}
            className={clsx('', className)}
            {...rest}
        >
            {children}
        </div>
    )
}
