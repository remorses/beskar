import { Fragment, useContext, useEffect, useState } from 'react'
import { Listbox, Transition } from '@headlessui/react'
import { CheckIcon, SelectorIcon } from '@heroicons/react/solid'
import classNames from 'classnames'
import useSWR, { useSWRConfig } from 'swr'

import { useDashboardData, useThrowingFn } from '../utils'
import { Modal, Input, Loading, Avatar } from '@nextui-org/react'
import { useRouter } from 'next/router'
import { useForm } from 'react-hook-form'
import { Button } from '@nextui-org/react'
import { PlusIcon } from '@heroicons/react/outline'
import { Faded } from 'baby-i-am-faded'

export type SelectOrgProps = {
    className?: string
}

export function SelectOrg({ className = '' }: SelectOrgProps) {
    const { getUserOrgs, createOrg } = useDashboardData()
    const { data, error } = useSWR(getUserOrgs, getUserOrgs)
    const orgs = data?.orgs || []

    if (error) {
        console.error(error)
    }

    const router = useRouter()
    const orgId = (router.query.orgId || '') as string
    useEffect(() => {
        const org = orgId ? orgs.find((x) => x.id === orgId) : orgs?.[0]
        if (!org) {
            return
        }
    }, [orgs])
    function onChange(value) {
        const org = orgs?.find((org) => org.id === value)
        if (!org) {
            console.warn('no org found', value)
            return
        }
        router.replace(`/org/${org.id}`)
    }
    const [isOpen, setOpen] = useState(false)

    const {
        register,
        handleSubmit,
        watch,
        trigger,
        reset,
        formState: { errors, isSubmitting },
    } = useForm()
    useEffect(() => {
        if (!isOpen) {
            reset()
        }
    }, [isOpen, reset])
    const { mutate } = useSWRConfig()

    const { fn: onSubmit, isLoading } = useThrowingFn({
        fn: async function onSubmit({ name }) {
            await createOrg({ name })
            mutate('getUserOrgs')
            setOpen(false)
        },
        successMessage: 'Created site',
        errorMessage: 'Could not create site',
    })

    const hoverClasses = 'hover:bg-gray-100 hover:dark:bg-gray-600 rounded mx-2'
    const current = orgs.find((x) => x.id === orgId)?.name
    return (
        <>
            <Listbox value={orgId} onChange={onChange}>
                <div className={classNames('relative mt-1', className)}>
                    <Listbox.Button className='relative w-full py-2 pl-3 pr-10 text-left bg-white rounded-lg shadow-sm border cursor-default dark:bg-gray-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-opacity-75 focus-visible:ring-white focus-visible:ring-offset-orange-300 focus-visible:ring-offset-2 focus-visible:border-indigo-500 sm:text-sm'>
                        <span
                            aria-label='current org'
                            className='flex space-x-2 truncate font-medium'
                        >
                            <OrgIcon name={current} />
                            <span className=''>{current || 'Loading'}</span>
                        </span>
                        <span className='absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none'>
                            <SelectorIcon
                                className='w-5 h-5 text-gray-400'
                                aria-hidden='true'
                            />
                        </span>
                    </Listbox.Button>
                    <Faded animationName='appear' duration={120} cascade>
                        <Listbox.Options
                            className={classNames(
                                'absolute flex flex-col  w-full py-1 mt-1 overflow-auto text-base bg-white rounded-md shadow-lg dark:bg-gray-700 max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm',
                            )}
                        >
                            {orgs?.map((org, idx) => (
                                <Listbox.Option
                                    key={org.id}
                                    className={({ active }) =>
                                        `cursor-default select-none relative py-2 pr-10 pl-1 ` +
                                        hoverClasses
                                    }
                                    value={org.id}
                                >
                                    {({ selected, active }) => (
                                        <>
                                            <span
                                                className={classNames(
                                                    `flex space-x-2 truncate font-medium`,
                                                )}
                                            >
                                                <OrgIcon name={org.name} />
                                                <span className=''>
                                                    {org.name}
                                                </span>
                                            </span>
                                            {selected ? (
                                                <span
                                                    className={classNames(
                                                        `absolute inset-y-0 right-1 flex items-center pl-3`,
                                                        active
                                                            ? 'text-amber-600'
                                                            : 'text-amber-600',
                                                    )}
                                                >
                                                    <CheckIcon
                                                        className='w-5 h-5'
                                                        aria-hidden='true'
                                                    />
                                                </span>
                                            ) : null}
                                        </>
                                    )}
                                </Listbox.Option>
                            ))}
                            <button
                                onClick={() => setOpen(true)}
                                className={classNames(
                                    'flex space-x-3 px-2 py-2 text-left items-center pl-3 font-medium',
                                    hoverClasses,
                                )}
                            >
                                <PlusIcon className='w-4 h-4' />
                                <div>New Org</div>
                            </button>
                        </Listbox.Options>
                    </Faded>
                </div>
            </Listbox>
            <Modal
                as='form'
                id='new-org-form'
                className='flex flex-col w-full space-y-8'
                onSubmit={handleSubmit(onSubmit)}
                blur
                closeButton
                open={isOpen}
                onClose={() => setOpen(false)}
            >
                <Modal.Header className='!text-xl'>New Org</Modal.Header>
                <Modal.Body className=''>
                    <Input
                        label='Org Name'
                        underlined
                        placeholder='name'
                        helperColor='error'
                        helperText={errors?.name?.message}
                        {...register('name', { required: true })}
                    />
                </Modal.Body>
                <Modal.Footer className=''>
                    {/* TODO button should not trigger onSibmit if disabled */}
                    <Button type='submit' size={'sm'}>
                        {isLoading ? (
                            <Loading color='white' size='sm' />
                        ) : (
                            'Create'
                        )}
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

import ColorHash from 'color-hash'
import { colord, extend } from 'colord'
import mixPlugin from 'colord/plugins/mix'
import harmoniesPlugin from 'colord/plugins/harmonies'

extend([mixPlugin, harmoniesPlugin])

const colorHash = new ColorHash({ lightness: 0.6 })

function OrgIcon({ name }) {
    const background = (() => {
        if (!name) {
            return '#aaa'
        }
        const color = colorHash.hex(name)

        const [first, second] = colord(color).harmonies('analogous')
        return `linear-gradient(to right, ${first.toHex()}, ${second
            .desaturate(0.3)
            .toHex()})`
    })()
    return <div style={{ background }} className='rounded-md h-5 w-5 '></div>
}

function NewOrgButton({ className = '' }) {
    return <div className=''></div>
}
