'use client'

import React, { Dispatch, SetStateAction, useState } from "react";

import { Collapsible, ComboboxFactory, ComboboxOption, FormFieldOptions, Input } from "@workspace/ui/components";
import { usePeriodOptions, useSavedSearchOptions } from "./main.api";
import { useDateExecutionSettingsOptions } from "./date-execution-settings/form/form.api";
import { DateExecutionSettingsForm, ExecutionDateSettingsFormProps } from "./date-execution-settings";
import { FilePenLine, FilePlus2 } from "lucide-react";
import { useSearchParams } from "next/navigation";

const Combobox = ComboboxFactory()

type ExecutionDateSettingsFormMode = ExecutionDateSettingsFormProps['mode'] | 'closed'

interface MainSectionOptions {
  name: string
  setName: Dispatch<SetStateAction<string>>
  savedSearch?: ComboboxOption
  setSavedSearch: Dispatch<SetStateAction<ComboboxOption | undefined>>
  dateFilterField?: string
  setDateFilterField: Dispatch<SetStateAction<string | undefined>>
  period?: ComboboxOption
  setPeriod: Dispatch<SetStateAction<ComboboxOption | undefined>>
  periodDelay: string
  setPeriodDelay: Dispatch<SetStateAction<string>>
  dateExecutionSettings?: ComboboxOption
  setDateExecutionSettings: Dispatch<SetStateAction<ComboboxOption | undefined>>
}

const dateExecutionSettingsLabel = 'Date Execution Settings'

export const MainSection: React.FC<MainSectionOptions> = ({
  name,
  setName,
  savedSearch,
  setSavedSearch,
  dateFilterField,
  setDateFilterField,
  period,
  setPeriod,
  periodDelay,
  setPeriodDelay,
  setDateExecutionSettings,
  dateExecutionSettings
}) => {
    const params = useSearchParams()
    const viewMode = params.get('view-mode') === "true"

    const { dateExecutionSettingsOptions } = useDateExecutionSettingsOptions()
    const { savedSearchOptions } = useSavedSearchOptions()
    const { periodOptions } = usePeriodOptions()

    const [dateExecutionSettingsFormMode, setDateExecutionSettingsFormMode] = useState<ExecutionDateSettingsFormMode>('closed')

    const addNewExecutionDateSetting = () => {
      setDateExecutionSettingsFormMode('add')
    }

    const editExecutionDateSetting = () => {
      setDateExecutionSettingsFormMode('edit')
    }

    const onDateExecutionSave: ExecutionDateSettingsFormProps['onSave'] = (res) => {
      setDateExecutionSettings({
        id: res.id,
        label: res.name,
        value: res.name
      })
    }

    return (
      <>
        <Collapsible className="pr-8" title="Main" initialState="open">
          <div className="grid grid-rows-3 md:grid-rows-2 grid-flow-col auto-cols-[1fr] gap-x-14 gap-y-4 items-center">
            <Input
              viewMode={viewMode}
              required
              label="Name"
              name="name"
              onChange={setName}
              value={name}
            />

            <Combobox
              viewMode={viewMode}
              required  
              name="saved_search"
              label="Saved Search"
              options={savedSearchOptions}
              onSelect={setSavedSearch}
              optionSelected={savedSearch}
            />

            <Input
              viewMode={viewMode}
              label="Date Filter Field"
              name="date-filter-field"
              onChange={setDateFilterField}
              value={dateFilterField}
            />

            <Combobox
              viewMode={viewMode}
              required
              name="period"
              label="Period"
              options={periodOptions}
              onSelect={setPeriod}
              optionSelected={period}
            />

            <Input
              viewMode={viewMode}
              required
              label="Period Delay (Days)"
              name="period-delay"
              onChange={setPeriodDelay}
              value={periodDelay}
            />

            <div className="flex gap-2 relative">
              <Combobox 
                viewMode={viewMode}
                name="date-execution-settings"
                label={dateExecutionSettingsLabel}
                options={dateExecutionSettingsOptions}
                optionSelected={dateExecutionSettings}
                onSelect={setDateExecutionSettings}
              />
              {!viewMode && (
                <div className="h-[fit-content] absolute top-8 -right-6">
                  <FormFieldOptions
                    align="end"
                    fieldLabel={dateExecutionSettingsLabel}
                    options={[
                      {icon: FilePlus2, id: 'add', name: 'New Date Execution Setting', onSelected: addNewExecutionDateSetting},
                      {icon: FilePenLine, id: 'edit', name: 'Edit Date Execution Setting', disabled: !dateExecutionSettings, onSelected: editExecutionDateSetting}
                    ]}
                  />
                </div>
              )}
            </div>
          </div>
        </Collapsible>
        {dateExecutionSettingsFormMode !== 'closed' && (
          <DateExecutionSettingsForm 
            mode={dateExecutionSettingsFormMode}
            onSave={onDateExecutionSave}
            afterClose={() => setDateExecutionSettingsFormMode('closed')}
            dateExecutionId={dateExecutionSettingsFormMode === 'edit' ? dateExecutionSettings?.id : undefined}
          />
        )}
      </>
    )
}

