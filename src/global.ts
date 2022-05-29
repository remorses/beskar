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
            // TODO user needs to add id field on next auth
        } & DefaultSession['user']
        expires: ISODateString
    }
}

declare global {
    const Paddle: any
    // const gtag: Function
    // interface Window {
    //     loginForTests: ({ name, email }) => Promise<any>
    //     $crisp?: any[]
    // }
}
