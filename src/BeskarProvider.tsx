import { ReactNode } from 'react'
import { BeskarContext, beskarContext } from './utils'

export function BeskarProvider({
    children,
    ...rest
}: BeskarContext & { children: ReactNode }) {
    return (
        <beskarContext.Provider value={rest}>{children}</beskarContext.Provider>
    )
}
