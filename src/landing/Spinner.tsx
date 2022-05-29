import clsx from 'clsx'

export function Spinner({ className = '' }) {
    return (
        <>
            <style jsx>{`
                .spinner {
                    position: relative;
                    pointer-events: none;
                }

                .spinner::after {
                    content: '';
                    position: absolute !important;
                    top: calc(50% - (1em / 2));
                    left: calc(50% - (1em / 2));
                    display: block;
                    width: 1em;
                    height: 1em;
                    border: 2px solid currentColor;
                    border-radius: 9999px;
                    border-right-color: transparent;
                    border-top-color: transparent;
                    animation: spinAround 500ms infinite linear;
                }

                @keyframes spinAround {
                    from {
                        transform: rotate(0deg);
                    }
                    to {
                        transform: rotate(360deg);
                    }
                }
            `}</style>

            <div className={clsx('spinner w-5 h-5', className)} />
        </>
    )
}
