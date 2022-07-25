import { Faded } from 'baby-i-am-faded'
import cs from 'classnames'
import clsx from 'clsx'
import React, { ComponentPropsWithoutRef, ReactNode } from 'react'
import { Modal } from './Modal'
import { PageContainer } from './PageContainer'
import { useDisclosure } from '../utils'

export type NavBarProps = {
    logo: ReactNode
    navs?: ReactNode | ReactNode[]
} & ComponentPropsWithoutRef<'div'>

export const NavBar = ({
    logo,
    navs = [],
    className = '',
    style,
    ...rest
}: NavBarProps) => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const menuButtonStyle = {
        width: 32,
        height: 32,
    }
    return (
        <PageContainer
            dontContain
            // style={{ contain: 'initial', ...style }}
            {...rest}
        >
            <div className={clsx('flex w-full py-4', className)}>
                <div className='self-start'>{logo}</div>
                <div className='flex-1' />
                <div className='hidden md:flex items-center space-x-6 lg:space-x-8 font-medium '>
                    {Array.isArray(navs)
                        ? navs.map((x, i) => (
                              <div key={i} className='cursor-pointer'>
                                  {x}
                              </div>
                          ))
                        : navs}
                </div>
                <button
                    className='appearance-none block md:hidden'
                    onClick={onOpen}
                >
                    <Menu
                        style={{
                            ...menuButtonStyle,
                        }}
                    />
                </button>
            </div>
            <Modal
                isOpen={isOpen}
                onClose={onClose}
                content={
                    <Faded
                        className={cs(
                            'bg-gray-900/80 fixed w-screen h-screen inset-0',
                            'pt-6 space-y-6 flex flex-col items-center text-white',
                            'font-medium',
                        )}
                    >
                        <Modal.CloseButton
                            style={{ right: 20, top: 20, ...menuButtonStyle }}
                            onClick={onClose}
                        />
                        {Array.isArray(navs) ? (
                            <>
                                {navs.map((x, i) => (
                                    <div className='' key={i}>
                                        {x}
                                    </div>
                                ))}
                            </>
                        ) : (
                            navs
                        )}
                    </Faded>
                }
                // finalFocusRef={btnRef}
            ></Modal>
        </PageContainer>
    )
}

const Menu = (props) => {
    return (
        <svg
            xmlns='http://www.w3.org/2000/svg'
            width='28'
            height='28'
            viewBox='0 0 24 24'
            fill='none'
            stroke='currentColor'
            strokeWidth='2'
            strokeLinejoin='round'
            strokeLinecap='round'
            {...props}
        >
            <line x1='3' y1='12' x2='21' y2='12'></line>
            <line x1='3' y1='6' x2='21' y2='6'></line>
            <line x1='3' y1='18' x2='21' y2='18'></line>
        </svg>
    )
}
