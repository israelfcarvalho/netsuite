'use client'

import React, { Dispatch, SetStateAction, useState } from "react";

import { Checkbox, Collapsible, ComboboxFactory, ComboboxOption, Input } from "@workspace/ui/components";
import { FilePenLine, FilePlus2 } from "lucide-react";
import { FormFieldOptions } from "@workspace/ui/components";
import { StorageSettingsForm, StorageSettingsFormProps } from "./settings";
import { useStorageSettingsOptions } from "./storage.api";
import { useSearchParams } from "next/navigation";

const Combobox = ComboboxFactory()

const StorageSettingsLabel = "Storage Settings"
const CREATE_PERIOD_FOLDER_DEFAULT = false
const APPEND_EXECUTION_DATE_TO_FILE_NAME_DEFAULT = false

type StorageSettingsFormMode = StorageSettingsFormProps['mode'] | 'closed'

interface StorageSettingsSection {
  storageSettings?: ComboboxOption
  setStorageSettings: Dispatch<SetStateAction<ComboboxOption | undefined>>
  destinyFolderPath: string
  setDestinyFolderPath: Dispatch<SetStateAction<string>>
  createPeriodFolder: boolean
  setCreatePeriodFolder: Dispatch<SetStateAction<boolean>>
  fileNamePrefix: string
  setFileNamePrefix: Dispatch<SetStateAction<string>>
  appendExecutionDateToFileName: boolean
  setAppendExecutionDateToFileName: Dispatch<SetStateAction<boolean>>
}

export const StorageSection: React.FC<StorageSettingsSection> = ({
  destinyFolderPath,
  fileNamePrefix,
  setAppendExecutionDateToFileName,
  setCreatePeriodFolder,
  setDestinyFolderPath,
  setFileNamePrefix,
  setStorageSettings,
  storageSettings,
  appendExecutionDateToFileName,
  createPeriodFolder
}) => {
    const params = useSearchParams()
    const viewMode = params.get('view-mode') === "true"

    const { storageSettingsOptions } = useStorageSettingsOptions()

    const [storageSettingsFormMode, setStorageSettingsFormMode] = useState<StorageSettingsFormMode>('closed')
    const [storageSettingsFormId, setStorageSettingFormId] = useState<string>()

    const addNewStorageSetting = () => {
      setStorageSettingsFormMode('add')
      setStorageSettingFormId(undefined)
    }

    const editStorageSetting = () => {
      setStorageSettingsFormMode('edit')
      setStorageSettingFormId(storageSettings?.id)
    }

    const onStorageSave: StorageSettingsFormProps['onSave'] = (res) => {
      setStorageSettings({id: res.id, label: res.name, value: res.name})
    }

    return (
        <>
          <Collapsible className="pr-8" title="Storage" initialState="open">
              <div className="grid grid-rows-3 md:grid-rows-2 grid-flow-col auto-cols-[1fr] gap-x-14 gap-y-4 items-center">
                <div className="flex gap-2 items-end relative">
                  <Combobox
                    viewMode={viewMode}
                    required
                    label={StorageSettingsLabel}
                    name="storage_settings"
                    options={storageSettingsOptions}
                    onSelect={setStorageSettings}
                    optionSelected={storageSettings}
                  />
                  
                  {!viewMode && (
                    <div className="h-[fit-content] absolute top-8 -right-6">
                      <FormFieldOptions
                        fieldLabel={StorageSettingsLabel}
                        options={[
                          {icon: FilePlus2, id: 'add', name: 'New Storage Settings', onSelected: addNewStorageSetting},
                          {icon: FilePenLine, id: 'edit', name: 'Edit Storage Settings', disabled: !storageSettings, onSelected: editStorageSetting}
                        ]}
                      />
                    </div>
                  )}
                </div>

                <Input
                  viewMode={viewMode}
                  required  
                  name="destiny_folder_path"
                  label="Destiny Folder Path"
                  onChange={setDestinyFolderPath}
                  value={destinyFolderPath}
                />

                <Checkbox
                  viewMode={viewMode}
                  id="storage-create-period-folder" 
                  label="Create Period Folder" 
                  defaultChecked={CREATE_PERIOD_FOLDER_DEFAULT}
                  onChange={setCreatePeriodFolder}
                  value={createPeriodFolder}
                />

                <Input
                  viewMode={viewMode}
                  required
                  name="file_name_prefix"
                  label="File Name Prefix"
                  onChange={setFileNamePrefix}
                  value={fileNamePrefix}
                />

                <Checkbox
                  viewMode={viewMode}
                  id="append_execution_date_to_file_name" 
                  label="Append Execution Date To File Name" 
                  defaultChecked={APPEND_EXECUTION_DATE_TO_FILE_NAME_DEFAULT}
                  onChange={setAppendExecutionDateToFileName}
                  value={appendExecutionDateToFileName}
                />
              </div>
          </Collapsible>

          {storageSettingsFormMode !== 'closed' && (
            <StorageSettingsForm 
              mode={storageSettingsFormMode}
              afterClose={() => setStorageSettingsFormMode('closed')}
              storageId={storageSettingsFormId}
              onSave={onStorageSave}
            />
        )}
        </>
    )
}

