'use client'

import React, { useEffect, useState } from "react";

import { Collapsible, ComboboxFactory, ComboboxOption, FormSheet, FormSheetProps, Input, Separator, Textarea } from "@workspace/ui/components";
import { useSaveStorage, useStorageOptions, useStorageSettings } from "./form.api";
import { StorageSettingsFormProps } from "./form.types";
import { useAlert } from "@workspace/ui/hooks";


const Combobox = ComboboxFactory()

//TODO: QUEM SABE CRIAR UM PROVIDER POR CIMA DESSE ON CLOSE PRA QUANDO FECHAR O MODAL, 
//APOS A ANIMACAO ACABAR, TIRAR ELE DA TELA (ter um OPT-OUT desse comportamento)
export const StorageSettingsForm: React.FC<StorageSettingsFormProps> = ({
    mode,
    storageId,
    afterClose,
    onSave
}) => {
    const { alert } = useAlert()
    const { data } = useStorageSettings(storageId)
    const { storageOptions } = useStorageOptions()
    const { saveStorageSetting } = useSaveStorage()

    const [open, setOpen] = useState(true)
    const [name, setName] = useState('')
    const [storage, setStorage] = useState<ComboboxOption>()
    const [microsoftSharePointSiteId, setMicrosoftSharePointSiteId] = useState<string>()

    useEffect(() => {
        setInitialData()
    }, [data])

    const setInitialData = () => {
        if(data){
            setMicrosoftSharePointSiteId(data.microsoftSharePointSiteId)
            setStorage({
                id: data.storage.id,
                label: data.storage.name,
                value: data.storage.name
            })
            setName(data.name)
        }
    }

    const handleSubmmit = () => {
        const requiredFields = {
            name: !!name,
            storage: !!storage
        }

        const cnaSubmit = 
            !!name && !!requiredFields.name &&
            !!storage && !!requiredFields.storage

        if(!cnaSubmit){
            const message = Object.entries(requiredFields).reduce((messages, [field, fieldFufilled]) => {
                return fieldFufilled ? messages : [...messages, field]
            }, [] as string[])

            alert({message, title: 'Missing Required Fields'})
        } else {
            saveStorageSetting({
                id: storageId,
                name,
                storage,
                microsoftSharePointSiteId
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
            title="SM | Storage Settings"
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
                    </div>

                    <div className="flex flex-col gap-2"> 
                        <Combobox
                          required
                          label='Storage'
                          name="storage"
                          options={storageOptions}
                          onSelect={setStorage}
                          optionSelected={storage}
                        />
                    </div>
                </div>
            </Collapsible>

            <Separator className="bg-transparent my-2"/>

            <Collapsible title="Microsoft Share Point" initialState="open">
                <div className="grid grid-cols-1 gap-14">
                    <div className="flex flex-col gap-2"> 
                        <Textarea  
                            maxLength={1000000}
                            name="microsoft-share-point-site-id"
                            label="Microsoft Share Point - Site Id"
                            value={microsoftSharePointSiteId}
                            onChange={event => setMicrosoftSharePointSiteId(event.target.value)}
                        />
                    </div>
                </div>  
            </Collapsible>
        </FormSheet>
    )
}