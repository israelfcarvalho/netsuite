import React, { ReactNode } from 'react';

export interface FormProps {
    title?: string;
    subtitle?: string;
    children: React.ReactNode;
    onSubmit: React.FormEventHandler<HTMLFormElement>
    onCancel?: VoidFunction
    onReset?: VoidFunction
    submitLabel?: string
    contentClassname?: string
    logo?: ReactNode
}


export interface FormFieldOption {
    id: string
    value: string
    label: string
}