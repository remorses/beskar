import { ChevronDownIcon } from '@heroicons/react/solid'
import { Faded } from 'baby-i-am-faded'
import { default as classNames, default as cs } from 'classnames'
import {
    ComponentPropsWithoutRef,
    createContext,
    forwardRef,
    ReactNode,
    useContext,
    useRef,
    useState,
} from 'react'
import { useOnClickOutside } from '../utils'

const context = createContext<{ isOpen: boolean; setOpen: Function }>({
    isOpen: false,
    setOpen: () => {},
})

export function PopOver({ className = '', items, button }) {
    const [isOpen, setIsOpen] = useState(false)
    const panel =useRef<any>(undefined)
    useOnClickOutside(panel, () => setIsOpen(false))
    return (
        <context.Provider value={{ isOpen, setOpen: setIsOpen }}>
            <div ref={panel} className={classNames('relative ')}>
                {button}
                <Faded duration={140} key={isOpen ? 'open' : 'hidden'}>
                    <Faded
                        delay={50}
                        animationName='animateOnX'
                        cascade
                        cascadeIncrement={50}
                        key={isOpen ? 'open' : 'hidden'}
                        className={cs(
                            'absolute p-4 space-y-4 w-max shadow-2xl ring-1',
                            'ring-black ring-opacity-5 overflow-hidden max-w-screen-sm',
                            'flex flex-col mt-3 transform -translate-x-1/2',
                            'left-1/2 bg-white rounded-md dark:bg-gray-700',
                            className,
                            isOpen ? '!block' : '!hidden',
                        )}
                    >
                        {items}
                    </Faded>
                </Faded>
            </div>
        </context.Provider>
    )
}

const Button = forwardRef<any, ComponentPropsWithoutRef<'button'>>(
    function Button({ children }, ref) {
        const { isOpen, setOpen } = useContext(context)
        return (
            <button
                ref={ref}
                onClick={() => setOpen((isOpen) => !isOpen)}
                className={cs(
                    'group rounded-md inline-flex items-center font-medium',
                    'hover:text-opacity-100 focus:outline-none',
                    'focus-visible:ring-2 focus-visible:ring-white',
                    'focus-visible:ring-opacity-75',
                )}
            >
                <div className=''>{children}</div>
                <ChevronDownIcon
                    className={classNames(
                        'ml-1 pt-1 h-6 w-6 flex-shrink-0 transition ease-in-out',
                        'duration-150 group-hover:text-opacity-80',
                    )}
                    aria-hidden='true'
                />
            </button>
        )
    },
)

PopOver.Button = Button

const Item = forwardRef<
    any,
    {
        icon?: ReactNode
        title?: ReactNode
        description?: ReactNode
    } & ComponentPropsWithoutRef<'a'>
>(function Item({ title, description = '', icon = null, ...rest }, ref) {
    return (
        <a
            ref={ref}
            className={cs(
                'flex items-center p-2 transition duration-150',
                'ease-in-out rounded-lg !bg-opacity-60 cursor-pointer',
                'active:bg-warmGray-200 dark:active:bg-gray-500',
                'focus:outline-none hover:bg-warmGray-200 dark:hover:bg-gray-500',
                'focus-visible:ring focus-visible:ring-orange-500',
                'focus-visible:ring-opacity-50',
            )}
            {...rest}
        >
            <div
                className={cs(
                    'flex items-center justify-center flex-shrink-0',
                    'w-12 h-12',
                )}
            >
                {icon}
            </div>
            <div className='ml-4'>
                <p className='font-medium'>{title}</p>
                <p className='text-sm opacity-60'>{description}</p>
            </div>
        </a>
    )
})

PopOver.Item = Item
