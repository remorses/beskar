import { Button, Divider, Modal, Spinner } from './landing'
import { Fragment, useContext, useEffect, useState } from 'react'
import { Listbox, Transition } from '@headlessui/react'
import { CheckIcon, SelectorIcon } from '@heroicons/react/solid'
import classNames from 'classnames'
import useSWR, { useSWRConfig } from 'swr'

import { useBeskar, useDisclosure, useThrowingFn } from './utils'
import { useRouter } from 'next/router'
import { useForm } from 'react-hook-form'
import { PlusIcon } from '@heroicons/react/outline'

export type SelectOrgProps = {
    className?: string
}

/**
 * Needs to have orgId param in query
 */
export function SelectOrg({ className = '' }: SelectOrgProps) {
    const { getUserOrgs, createOrg } = useBeskar()
    const { data, error } = useSWR('getUserOrgs', getUserOrgs)
    // console.log({ data })
    const orgs = data?.orgs || []

    if (error) {
        console.error(error)
    }

    const router = useRouter()
    const orgId = (router.query.orgId || '') as string

    function onChange(value) {
        const org = orgs?.find((org) => org.id === value)
        if (!org) {
            console.warn('no org found', value)
            return
        }
        const newPath = `/org/${org.id}`
        router.replace(newPath)
    }
    const { isOpen, onOpen, onClose } = useDisclosure()

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
            // throw new Error('not implemented')

            await createOrg({ name })
            mutate('getUserOrgs')
            onClose()
        },
        successMessage: 'Created org',
        errorMessage: 'Could not create org',
    })

    return (
        <>
            <Select
                useAutoGradientIcons
                value={orgId}
                onChange={onChange}
                className='min-w-[14ch]'
                endButton={
                    <Select.SelectButton children='New Org' onClick={onOpen} />
                }
                options={orgs.map((o) => {
                    return {
                        value: o.id,
                        name: o.name,
                    }
                })}
            />
            <Modal
                className='flex flex-col w-full space-y-8 !max-w-xl'
                isOpen={isOpen}
                useDefaultContentStyle
                onClose={onClose}
                content={
                    <form
                        className='space-y-8'
                        id='new-org-form'
                        onSubmit={handleSubmit(onSubmit)}
                    >
                        <Modal.CloseButton onClick={onClose} />
                        <div className='font-semibold text-xl text-center'>
                            New Org
                        </div>

                        <Input
                            label='Org Name'
                            // underlined
                            placeholder='Name'
                            // helperColor='error'
                            errorMessage={String(errors?.name?.message || '')}
                            {...register('name', { required: true })}
                        />

                        <Button
                            isLoading={isLoading}
                            className='text-sm self-center'
                            type='submit'
                            as='button'
                        >
                            Create
                        </Button>
                    </form>
                }
            />
        </>
    )
}

import ColorHash from 'color-hash'
import { colord, extend } from 'colord'
import mixPlugin from 'colord/plugins/mix'
import harmoniesPlugin from 'colord/plugins/harmonies'
import { Faded } from 'baby-i-am-faded'

import { Input } from './landing/Input'
import { Select } from './Select'

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
