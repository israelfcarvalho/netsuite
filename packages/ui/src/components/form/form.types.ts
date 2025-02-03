import React, { ReactNode } from 'react';
import { ButtonProps } from '../button/button.types';

type ActionAlign = 'start' | 'end' 

interface FormAction {
    id: string
    label: string
    onClick: VoidFunction
    variant?: ButtonProps['variant']
    align?: ActionAlign
}

export interface FormProps {
    title?: string;
    subtitle?: string;
    children: React.ReactNode;
    onSubmit?: React.FormEventHandler<HTMLFormElement>
    submitLabel?: string
    contentClassname?: string
    logo?: ReactNode
    actions?: FormAction[]
}


export interface FormFieldOption {
    id: string
    value: string
    label: string
}