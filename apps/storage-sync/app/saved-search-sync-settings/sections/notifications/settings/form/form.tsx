'use client'

import React, { useEffect, useState } from "react";

import { Collapsible, ComboboxFactory, ComboboxOption, FormSheet, FormSheetProps, Input, MultiSelect, MultiSelectOption, Separator, Textarea } from "@workspace/ui/components";
import { useEmailTemplateOptions, useEmployeeOptions, useNotificationSettings, useSaveNotificationSettings } from "./form.api";
import { NotificationSettingsFormProps } from "./form.types";
import { useAlert } from "@workspace/ui/hooks";


const Combobox = ComboboxFactory()

export const NotificationSettingsForm: React.FC<NotificationSettingsFormProps> = ({
    mode,
    notificationId,
    afterClose,
    onSave
}) => {
    const { alert } = useAlert()
    const { data } = useNotificationSettings(notificationId)
    const { emailTemplateOptions } = useEmailTemplateOptions()
    const { employeeOptions } = useEmployeeOptions()
    const { saveNotificationSettings } = useSaveNotificationSettings()

    const [open, setOpen] = useState(true)
    const [name, setName] = useState('')
    const [emailTemplate, setEmailTemplate] = useState<ComboboxOption>()
    const [emailSender, setEmailSender] = useState<ComboboxOption>()
    const [emailMainRecipientsEmployee, setEmailMainRecipientsEmployee] = useState<MultiSelectOption[]>([])
    const [emailMainRecipientsEmail, setEmailMainRecipientsEmail] = useState('')
    const [copiesToEmployee, setCopiesToEmployee] = useState<MultiSelectOption[]>([])
    const [copiesToEmail, setCopiesToEmail] = useState('')

    useEffect(() => {
        setInitialData()
    }, [data])

    const setInitialData = () => {
        if(data){
            setName(data.name)
            setEmailTemplate({
                id: data.emailTemplate.id,
                label: data.emailTemplate.name,
                value: data.emailTemplate.name
            })
            setEmailSender({
                id: data.emailSender.id,
                label: data.emailSender.name,
                value: data.emailSender.name
            })
            setEmailMainRecipientsEmployee(data.emailMainRecipientsEmployees.map(employee => ({
                id: employee.id,
                label: employee.name,
                value: employee.name
            })))
            setCopiesToEmployee(data.copiesToEmployees.map(employee => ({
                id: employee.id,
                label: employee.name,
                value: employee.name
            })))
            setEmailMainRecipientsEmail(data.emailMainRecipientsEmails.join(',\n'))
            setCopiesToEmail(data.copiesToEmails.join(',\n'))
        }
    }

    const handleSubmmit = () => {
        const requiredFields = {
            name: !!name,
            emailTemplate: !!emailTemplate,
            emailSender: !!emailSender,
            emailMainRecipientsEmployee: !!emailMainRecipientsEmployee
        }

        const canSubmit = 
            !!name && !!requiredFields.name &&
            !!emailTemplate && !!requiredFields.emailTemplate &&
            !!emailSender && !!requiredFields.emailSender &&
            !!emailMainRecipientsEmployee && !!requiredFields.emailMainRecipientsEmployee


        if(!canSubmit){
            const message = Object.entries(requiredFields).reduce((messages, [field, fieldFufilled]) => {
                return fieldFufilled ? messages : [...messages, field]
            }, [] as string[])

            alert({message, title: 'Missing Required Fields'})
        } else {
            saveNotificationSettings({
                id: notificationId,
                name,
                emailMainRecipientsEmployees: emailMainRecipientsEmployee.map(({id}) => ({id})),
                copiesToEmployees: copiesToEmployee.map(({id}) => ({id})),
                emailSender: { id: emailSender.id },
                emailTemplate: { id: emailTemplate.id },
                copiesToEmails: copiesToEmail,
                emailMainRecipientsEmails: emailMainRecipientsEmail
            }, {
                onSuccess(res){
                    setOpen(false)
                    onSave(res)
                },
                onError(err){
                    alert({message: [err.message], title: 'Error'})
                }
            })
        }
    }

    const handleFormSheetStateChange: FormSheetProps['onStateAnimationEnd'] = (state) => {
        if(afterClose && state === 'closed'){
            afterClose()
        }
    }

    return (
        <FormSheet 
            className="sm:max-w-[600px]"
            title="SM | Notification Settings"
            open={open}
            onOpenChange={setOpen}
            onSubmit={handleSubmmit}
            onCancel={() => setOpen(false)}
            onStateAnimationEnd={handleFormSheetStateChange}
            onReset={mode === 'edit' ? setInitialData : undefined}
        >
            <Collapsible title="Main" initialState="open">
                <div className="grid grid-cols-2 gap-14">
                    <div className="flex flex-col gap-2">
                        <Input
                            required  
                            name="name"
                            label="Name"
                            onChange={setName}
                            value={name}
                        />

                        <Combobox
                          required
                          label='Email Template'
                          name="email-template"
                          options={emailTemplateOptions}
                          onSelect={setEmailTemplate}
                          optionSelected={emailTemplate}
                        />
                    </div>

                    <div className="flex flex-col gap-2"> 
                        <Combobox
                          required
                          label='Email Sender'
                          name="email-sender"
                          options={employeeOptions}
                          onSelect={setEmailSender}
                          optionSelected={emailSender}
                        />
                    </div>
                </div>
            </Collapsible>

            <Separator className="bg-transparent my-2"/>

            <Collapsible title="Microsoft Share Point" initialState="open">
                <div className="grid grid-cols-2 gap-14">
                    <MultiSelect
                        required
                        label={{
                            id: 'notification-settings-email-main-recipients-employee',
                            name: 'Email Main Recipients (Employee)'
                        }}
                        onValueChange={setEmailMainRecipientsEmployee}
                        options={employeeOptions}
                        selectedOptions={emailMainRecipientsEmployee}
                        maxCount={5}
                    />

                    <MultiSelect
                        required
                        label={{
                            id: 'notification-settings-copies-to-employee',
                            name: 'Copies To (Employee)'
                        }}
                        onValueChange={setCopiesToEmployee}
                        options={employeeOptions}
                        selectedOptions={copiesToEmployee}
                        maxCount={5}
                    />

                    <Textarea
                        name="email-main-recipients-email"
                        label="Email Main recipients (Email)"
                        value={emailMainRecipientsEmail}
                        onChange={(event) =>  setEmailMainRecipientsEmail(event.target.value)}
                    />

                    <Textarea
                        name="email-copies-to-email"
                        label="Copies To (Email)"
                        value={copiesToEmail}
                        onChange={(event) =>  setCopiesToEmail(event.target.value)}
                    />

                </div>  
            </Collapsible>
        </FormSheet>
    )
}