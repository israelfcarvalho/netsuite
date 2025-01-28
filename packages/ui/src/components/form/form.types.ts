import React from 'react';

export interface FormProps {
    title?: string;
    subtitle?: string;
    children: React.ReactNode;
    onSubmit: React.FormEventHandler<HTMLFormElement>
    onCancel?: VoidFunction
    onReset?: VoidFunction
    submitLabel?: string
    contentClassname?: string
}


export interface FormFieldOption {
    id: string
    value: string
    label: string
}