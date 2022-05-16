import { Button, Loading } from '@nextui-org/react'
import clsx from 'clsx'
import React, { ComponentPropsWithoutRef, forwardRef } from 'react'
import { FormState } from 'react-hook-form'

export interface ButtonProps extends ComponentPropsWithoutRef<typeof Button> {
    formState: FormState<any>
}

export const SaveButton = forwardRef<any, ButtonProps>(
    (
        { className, children = 'Save', formState, disabled = false, ...props },
        ref,
    ) => {
        return (
            <Button
                size='sm'
                ref={ref}
                disabled={disabled || !formState.isDirty}
                type='submit'
                {...props}
            >
                {formState.isSubmitting ? <Loading size='xs' /> : children}
            </Button>
        )
    },
)

SaveButton.displayName = 'SaveButton'
