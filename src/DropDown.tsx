import { forwardRef, Fragment, ReactNode } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/solid'
import { Faded } from 'baby-i-am-faded'

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

interface Props {
    button: ReactNode
    children: ReactNode
    className?: string
}

export function DropDownMenu(props: Props) {
    const { children, button } = props
    return (
        <Menu
            as='div'
            className={classNames(
                'relative inline-block text-left',
                props.className,
            )}
        >
            <Menu.Button as='div'>{button}</Menu.Button>
            <style jsx>{`
                @keyframes menuAppear {
                    from {
                        opacity: 0;
                        transform: translate3d(0px, -2em, 0px) scale(0);
                    }
                    to {
                        opacity: 1;
                    }
                }
            `}</style>
            <Faded animationName='menuAppear' duration={120} cascade>
                <Menu.Items className='absolute border py-1 right-0 w-56 mt-2 origin-top-right bg-white rounded-md shadow-lg dark:bg-gray-800 ring-1 ring-black ring-opacity-5 focus:outline-none'>
                    {children}
                </Menu.Items>
            </Faded>
        </Menu>
    )
}

DropDownMenu.Button = Button
function Button({ className, children, ...props }) {
    return (
        <button
            className={classNames(
                'inline-flex justify-center w-full px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 dark:hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500',
                'cursor-pointer',
                className,
            )}
        >
            {children}
            <ChevronDownIcon
                className='w-5 h-5 ml-2 -mr-1'
                aria-hidden='true'
            />
        </button>
    )
}

const Item = forwardRef<
    any,
    {
        icon?: ReactNode
        children: ReactNode
        className?: string
    } & React.ComponentProps<'div'>
>(function Item({ icon = null, children, className = '', ...rest }, ref: any) {
    return (
        <Menu.Item>
            {({ active }) => (
                <div
                    className={classNames(
                        active ? 'bg-gray-100 text-gray-900' : '',
                        'flex space-x-3 px-4 py-2 text-sm rounded-md m-1',
                        'cursor-pointer',
                        className,
                    )}
                    ref={ref}
                    {...rest}
                >
                    {icon}
                    <div className=''>{children}</div>
                </div>
            )}
        </Menu.Item>
    )
})
DropDownMenu.Item = Item
