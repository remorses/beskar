import classNames from 'classnames'
import { useEffect } from 'react'
import useSWR, { useSWRConfig } from 'swr'
import { Button, Modal } from './landing'

import { useRouter } from 'next/router'
import { useForm } from 'react-hook-form'
import { Select } from './Select'
import { Input } from './landing/Input'
import { useDisclosure, useThrowingFn } from './utils'

export type SelectOrgProps = {
    className?: string
    // dashboardPath: string // /app for example
    getUserOrgs: () => Promise<{
        defaultOrgId: string
        orgs: { id: string; name: string; path?: string }[]
    }>
    createOrg: (x: { name: string }) => Promise<any>
}

export function SelectOrg({
    className = '',
    getUserOrgs,
    createOrg,
}: SelectOrgProps) {
    const { data, error, isValidating } = useSWR('getUserOrgs', getUserOrgs)
    // console.log({ data })
    const orgs = data?.orgs || []

    if (error) {
        console.error(error)
    }

    const router = useRouter()
    const orgId = (router.query.orgId || '') as string

    const { fn: onChange, isLoading: isOrgLoading } = useThrowingFn({
        fn: async function onChange(value) {
            const org = orgs?.find((org) => org.id === value)
            if (!org) {
                console.warn('no org found', value)
                return
            }
            const newPath = org.path || `/org/${org.id}`
            await router.replace(newPath)
        },
    })

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
                isLoading={isValidating || isLoading || isOrgLoading}
                value={orgId}
                onChange={onChange}
                className={classNames('min-w-[16ch] !border-0', className)}
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
