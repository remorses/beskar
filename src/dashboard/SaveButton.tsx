import classNames from 'classnames'
import React, { ComponentPropsWithoutRef, forwardRef } from 'react'
import { FormState } from 'react-hook-form'
import { Button, ButtonProps } from '../landing'

export interface SaveButtonProps extends ButtonProps {
    formState?: FormState<any>
}

export const SaveButton = forwardRef<any, SaveButtonProps>(
    ({ className, children = 'Save', formState, ...props }, ref) => {
        if (!formState) {
            return null
        }
        return (
            <Button
                // colorScheme={formState.isDirty ? 'blue' : 'gray'}
                disabled={!formState.isDirty}
                isLoading={formState.isSubmitting}
                type='submit'
                bg={formState.isDirty ? 'blue.500' : 'gray.600'}
                bgDark={formState.isDirty ? 'blue.200' : 'gray.600'}
                className={classNames(
                    'text-xs font-semibold transition-colors',
                    className,
                )}
                {...props}
            >
                {children}
            </Button>
        )
    },
)

SaveButton.displayName = 'SaveButton'
