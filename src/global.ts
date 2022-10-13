/// <reference types="styled-jsx" />
import { DefaultSession, ISODateString, Session } from 'next-auth'
import { JWT, DefaultJWT } from 'next-auth/jwt'

declare module 'next-auth' {
    /**
     * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
     */
    interface Session {
        // jwt: JWT
        user: {
            /** The user's postal address. */
            id: string
        } & DefaultSession['user']
        expires: ISODateString
    }
}

declare global {
    var Paddle: any
    // const gtag: Function
    // interface Window {
    //     loginForTests: ({ name, email }) => Promise<any>
    //     $crisp?: any[]
    // }
}
