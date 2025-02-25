import React from "react"
import * as FormPrimitives from '@radix-ui/react-form'
import { FormProvider, useForm } from 'react-hook-form'
import { FormDefaults, FormFields, FormProps, FormValue } from "./form.types"



export const formFactory = <T extends FormValue>(defaults: FormDefaults<T>) => {
    const Form: React.FCR<FormProps<T>, HTMLFormElement> = ({
        children,
        onSubmit,
        ref,
        ...props 
    }) => {
        const methods = useForm<T>()
    
        return (
            <FormProvider {...methods}>
                <FormPrimitives.Form
                    ref={ref}
                    onSubmit={methods.handleSubmit(onSubmit)}
                    {...props}
                >
                    { children }
                </FormPrimitives.Form>
            </FormProvider>
        )
    }

    const fields = {} as FormFields<T>

    for (const key in defaults) {
        const fieldKey = key as keyof T
        const fieldDefault = defaults[fieldKey]

        fields[fieldKey] = {
            name: fieldKey,
            default: fieldDefault
        }
    }

    return {
        Form,
        fields
    }
}