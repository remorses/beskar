import { Button } from './Button'
import clsx from 'clsx'
import { signIn } from 'next-auth/react'
import { useState } from 'react'
import { Link } from './Link'

export function GoogleLoginButton({
    callbackPath: callbackUrl = '/dashboard',
    className = '',
    text = 'Continue with Google',
    showEmailSignIn = false,
    disabled = false,
    ...rest
}) {
    const [isLoading, setIsLoading] = useState(false)
    return (
        <div className={clsx('flex flex-col items-center', className)}>
            <div className=''>
                <Button
                    bg='blue.500'
                    bgDark='blue.500'
                    biggerOnHover
                    className={clsx(
                        '!px-5 text-white',
                        !disabled && 'hover:bg-blue-300',
                    )}
                    style={{ minWidth: text.length + 2 + 'ch' }}
                    disabled={disabled}
                    isLoading={isLoading}
                    // bg='#0597FF'
                    onClick={async () => {
                        setIsLoading(true)
                        try {
                            await signIn(
                                'google',
                                {
                                    callbackUrl: new URL(
                                        callbackUrl,
                                        window.location.href,
                                    ).toString(),
                                    redirect: true,
                                },
                                { prompt: 'select_account' },
                            )
                        } finally {
                            setIsLoading(false)
                        }
                    }}
                    {...rest}
                >
                    <div
                        className={clsx(
                            'tracking-wide text-white space-x-2 justify-center items-center font-bold',
                            'flex-row flex',
                        )}
                    >
                        {disabled ? (
                            <div className=''>Logged in</div>
                        ) : (
                            <>
                                <GoogleIcon className='block w-5 h-5 fill-current' />
                                <div className='text-white truncate'>
                                    {text}
                                </div>
                            </>
                        )}
                    </div>
                </Button>

                {showEmailSignIn && (
                    <button
                        onClick={() => {
                            signIn(undefined, { callbackUrl })
                        }}
                        className='w-full text-center md:text-left appearance-none underline font-medium opacity-50 active:opacity-30 text-sm mt-3'
                        {...rest}
                    >
                        Continue with email instead
                    </button>
                )}
            </div>
        </div>
    )
}

function GoogleIcon({ ...rest }) {
    return (
        <svg
            xmlns='http://www.w3.org/2000/svg'
            x='0px'
            y='0px'
            viewBox='0 0 30 30'
            {...rest}
        >
            <path d='M 15.003906 3 C 8.3749062 3 3 8.373 3 15 C 3 21.627 8.3749062 27 15.003906 27 C 25.013906 27 27.269078 17.707 26.330078 13 L 25 13 L 22.732422 13 L 15 13 L 15 17 L 22.738281 17 C 21.848702 20.448251 18.725955 23 15 23 C 10.582 23 7 19.418 7 15 C 7 10.582 10.582 7 15 7 C 17.009 7 18.839141 7.74575 20.244141 8.96875 L 23.085938 6.1289062 C 20.951937 4.1849063 18.116906 3 15.003906 3 z' />
        </svg>
    )
}
