'use client'

import React, { useEffect, useState } from "react";

import { Checkbox, Collapsible, ComboboxFactory, ComboboxOption, FormSheet, FormSheetProps, Input } from "@workspace/ui/components";
import { 
    useDateExecutionSettings, 
    useHolidaySettingsOptions, 
    useSaveDateExecutionSettings 
} from "./form.api";
import { ExecutionDateSettingsFormProps } from "./form.types";
import { useAlert } from "@workspace/ui/hooks";


const Combobox = ComboboxFactory()

export const DateExecutionSettingsForm: React.FC<ExecutionDateSettingsFormProps> = ({
    mode,
    dateExecutionId,
    afterClose,
    onSave
}) => {
    const { alert } = useAlert()
    const { data } = useDateExecutionSettings(dateExecutionId)
    const { holidaySettingsOptions } = useHolidaySettingsOptions()
    const { saveDateExecutionSettings } = useSaveDateExecutionSettings()

    const [open, setOpen] = useState(true)
    const [name, setName] = useState('')
    const [runOnSunday,setRunOnSunday] = useState(false)
    const [runOnMonday,setRunOnMonday] = useState(false)
    const [runOnTuesday,setRunOnTuesday] = useState(false)
    const [runOnWednesday,setRunOnWednesday] = useState(false)
    const [runOnThursday,setRunOnThursday] = useState(false)
    const [runOnFriday,setRunOnFriday] = useState(false)
    const [runOnSaturday,setRunOnSaturday] = useState(false)
    const [holidaySettings, setHolidaySettings] = useState<ComboboxOption>()


    useEffect(() => {
        setInitialData()
    }, [data])

    const setInitialData = () => {
        if(data){
            setName(data.name)
            setRunOnSunday(data.runOnSunday)
            setRunOnMonday(data.runOnMonday)
            setRunOnTuesday(data.runOnTuesday)
            setRunOnWednesday(data.runOnWednesday)
            setRunOnThursday(data.runOnThursday)
            setRunOnFriday(data.runOnFriday)
            setRunOnSaturday(data.runOnSaturday)

            setHolidaySettings({
                id: data.holidaySettings.id,
                label: data.holidaySettings.name,
                value: data.holidaySettings.name
            })
        }
    }

    const handleSubmmit = () => {
        const requiredFields = {
            name: !!name
        }

        const canSubmit = 
            !!name && !!requiredFields.name

        if(!canSubmit){
            const message = Object.entries(requiredFields).reduce((messages, [field, fieldFufilled]) => {
                return fieldFufilled ? messages : [...messages, field]
            }, [] as string[])

            alert({message, title: 'Missing Required Fields'})
        } else {
            saveDateExecutionSettings({
                id: dateExecutionId,
                name,
                runOnSunday,
                runOnMonday,
                runOnTuesday,
                runOnWednesday,
                runOnThursday,
                runOnFriday,
                runOnSaturday,
                holidaySettings
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
            title="CM | Execution Date Settings"
            open={open}
            onOpenChange={setOpen}
            onSubmit={handleSubmmit}
            onCancel={() => setOpen(false)}
            onStateAnimationEnd={handleFormSheetStateChange}
            onReset={mode === 'edit' ? setInitialData : undefined}
        >
            <Collapsible title="Main" initialState="open">
                <div className="grid grid-flow-col grid-cols-2 grid-rows-[repeat(4,minmax(0,auto))] items-end gap-x-14 gap-y-4">
                    <Input
                        required  
                        name="name"
                        label="Name"
                        onChange={setName}
                        value={name}
                    />

                    <Checkbox 
                        id="run-on-sunday"
                        label="Run on Sunday"
                        value={runOnSunday}
                        onChange={setRunOnSunday}
                    />

                    <Checkbox 
                        id="run-on-monday"
                        label="Run on Monday"
                        value={runOnMonday}
                        onChange={setRunOnMonday}
                    />

                    <div className="self-start grid grid-rows-2 gap-y-4">
                        <Checkbox 
                            id="run-on-tuesday"
                            label="Run on Tuesday"
                            value={runOnTuesday}
                            onChange={setRunOnTuesday}
                        />

                        <Checkbox 
                            id="run-on-wednesday"
                            label="Run on Wednesday"
                            value={runOnWednesday}
                            onChange={setRunOnWednesday}
                        />
                    </div>

                    <Checkbox 
                        id="run-on-thursday"
                        label="Run on Thursday"
                        value={runOnThursday}
                        onChange={setRunOnThursday}
                    />

                    <Checkbox 
                        id="run-on-friday"
                        label="Run on Friday"
                        value={runOnFriday}
                        onChange={setRunOnFriday}
                    />

                    <Checkbox 
                        id="run-on-saturday"
                        label="Run on Saturday"
                        value={runOnSaturday}
                        onChange={setRunOnSaturday}
                    />

                    <Combobox
                      label='Holiday Settings'
                      name="holiday-settings"
                      options={holidaySettingsOptions}
                      onSelect={setHolidaySettings}
                      optionSelected={holidaySettings}
                    />
                </div>
            </Collapsible>
        </FormSheet>
    )
}