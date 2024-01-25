import clsx from 'clsx'

export function GoogleIcon({ ...rest }) {
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

export function TwitterIcon({ ...props }) {
    return (
        <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16' {...props}>
            <path
                fill='#888888'
                d='M12.6.75h2.454l-5.36 6.142L16 15.25h-4.937l-3.867-5.07l-4.425 5.07H.316l5.733-6.57L0 .75h5.063l3.495 4.633L12.601.75Zm-.86 13.028h1.36L4.323 2.145H2.865z'
            ></path>
        </svg>
    )
}
export function WavyArrow({ ...rest }) {
    return (
        <svg
            // width={61}
            // height={17}
            viewBox='0 0 61 17'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
            {...rest}
        >
            <path
                d='M58.913 16.996a1 1 0 0 0 1.083-.91l.78-8.966a1 1 0 1 0-1.993-.173l-.693 7.97-7.97-.693a1 1 0 1 0-.173 1.993l8.966.78Zm-57.115-.394c4.976-6.596 13.995-12.691 24.303-14.08 10.241-1.38 21.845 1.873 32.133 14.121l1.532-1.286C49.054 2.605 36.78-.934 25.834.54 14.954 2.006 5.472 8.41.202 15.398l1.596 1.204Z'
                fill='url(#svg1552719357_603_a)'
            />
            <defs>
                <linearGradient
                    id='svg1552719357_603_a'
                    x1={59}
                    y1={16}
                    x2={1}
                    y2={16}
                    gradientUnits='userSpaceOnUse'
                >
                    <stop stopColor='currentColor' />
                    <stop offset={1} stopColor='currentColor' stopOpacity={0} />
                </linearGradient>
            </defs>
        </svg>
    )
}
